let AzureDevOpsServiceInstance = ./ServiceInstance.dhall

let AzureDevOpsDirStructure =
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
          { devops =
            [ { mapKey = instance.parameters.projectname
              , mapValue =
                [ { mapKey = instance.serviceInstanceId, mapValue = "x" } ]
              }
            ]
          }
        : AzureDevOpsDirStructure

in  { Dir = AzureDevOpsDirStructure, provision }
