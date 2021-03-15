let AzureDevOpsServiceInstance = ./ServiceInstance.dhall

in  λ(instance : AzureDevOpsServiceInstance) →
      let tree =
          -- compute an output directory tree compatible with dhall to-directory-tree command
          -- this is not necessarily pretty when looking at nested maps, but unfortunately there's not a better dhall native
          -- way for now
            { mapKey = "functions"
            , mapValue =
              [ { mapKey = instance.parameters.projectname
                , mapValue =
                  [ { mapKey = instance.serviceInstanceId, mapValue = "x" } ]
                }
              ]
            }

      in  tree
