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
