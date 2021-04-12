# Unipipe Pipeline DSL

The Unipipe pipeline DSL allows service developers to quickly implement CI/CD pipelines for common service scenarios
like

- generating and execute terraform
- sending emails

The pipeline DSL builds on [dhall](https://dhall-lang.org), a configuration language that is ideal for expressing
configuration data and its transformation in a type-safe and predictable manner. The DSL requires only bash and the dhall binaries.
This allows the pipeline to be easily run in any CI/CD systems that supports a bash script job like Jenkins, Azure DevOps, GitLab or GitHub actions.

## Architecture

The pipeline DSL transforms a checked out "OSB git" directory tree produced by the Unipipe service broker into a
target directroy tree. Since this is usually some form of infrastructure as code (IaC) we call this the "IaC git".
Typically that target directory tree is also a git repository (or even the same repositroy, but a different branch).

```text
OSB git -> pipeline dsl -> IaC git
```

## Hacking

Generate a type definition from YAML

```bash
yaml-to-dhall type < instance.yml 
```

Parse the yml to dhall using full type checking

```bash
yaml-to-dhall ./Instance.dhall < instance.yml | tee a.dhall
```

We can also parse without any types at all, this produces exactly the same dhall value

```bash
yaml-to-dhall < instance.yml | tee c.dhall 
```

When type only supports a subset of the fields, we can use "loose" parsing. This is useful if we only want to get the fields of a type.

```bash
yaml-to-dhall ./Instance.dhall --records-loose  < instance.yml 
{ serviceDefinitionId = "d40133dd-8373-4c25-8014-fde98f38a728"
, serviceInstanceId = "e4bd6a78-7e05-4d5a-97b8-f8c5d1c710ab"
}
```

## Execution DSL

If we have it all in files where `fun.dhall` is a user defined function, we can just 

```bash
dhall <<< './fun.dhall ./a.dhall'
```

If the user defined function uses the wrong type for the parameter we will get a warning for superflous params

```text
23:37 $ dhall <<< './fun.dhall ./a.dhall'

Use "dhall --explain" for detailed errors

Error: Wrong type of function argument

{ + asyncAccepted : …
, + serviceInstanceId : …
, …
}

1│ ./fun.dhall ./a.dhall

(stdin):1:1
```


### 


## Example ci-cd script

```bash
# transform to terraform files
unipipe transform ./osb-repo ./my-handlers.ts

# for each dir 
  # run tf apply on all terraform modules
  terraform apply -auto-approve

  unipipe update ./osb-repo $instance-id "procisioning succesfull"
# 

git commit
git push
```