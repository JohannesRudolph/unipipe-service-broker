-- an example handler for a fictitious Azure DevOps Service
-- uses weakly-typed JSON rendering directly from dhall.
-- Note: this appears to be pretty slow, since the dhall prelude import needs to be evaluated on every interactive 
-- invocation of the handler (each service instance gets processed in its own dhall process). This might need to be optimized
-- for larger repositories.

let AzureDevOpsServiceInstance = ./ServiceInstance.dhall

let JSON = https://prelude.dhall-lang.org/JSON/package.dhall

let DirLayout =
    -- compute an output directory tree compatible with dhall to-directory-tree command
    -- this is not necessarily pretty when looking at nested maps, but unfortunately there's not a better dhall native
    -- way for now
      { devops :
          List
            { mapKey :
                -- project dir name
                Text
            , mapValue :
                -- project dir files
                List { mapKey : Text, mapValue : Text }
            }
      }

let provision =
      λ(instance : AzureDevOpsServiceInstance) →
        let json =
              JSON.object
                [ { mapKey = "meshCustomer"
                  , mapValue = JSON.string instance.context.customer_id
                  }
                , { mapKey = "meshProject"
                  , mapValue = JSON.string instance.context.project_id
                  }
                , { mapKey = "devOpsProjectName"
                  , mapValue = JSON.string instance.parameters.projectname
                  }
                ]

        in    { devops =
                [ { mapKey = instance.parameters.projectname
                  , mapValue =
                    [ { mapKey = "spec.json", mapValue = JSON.render json } ]
                  }
                ]
              }
            : DirLayout

in  { DirLayout, provision }
