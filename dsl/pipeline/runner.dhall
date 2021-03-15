let UniPipe = ./package.dhall

let serviceDefinitionIds =
      { azureDevOps = "22e1bbf3-b425-46cd-a03e-927f73abcaaf" }

in  λ(instance : UniPipe.OSB.ServiceInstance) →
      let tree =
          -- compute an output directory tree compatible with dhall to-directory-tree command
          -- this is not necessarily pretty when looking at nested maps, but unfortunately there's not a better dhall native
          -- way for now
            { projects =
              [ { mapKey = instance.parameters.projectname
                , mapValue =
                  [ { mapKey = instance.serviceInstanceId, mapValue = "x" } ]
                }
              ]
            }

      in  tree
