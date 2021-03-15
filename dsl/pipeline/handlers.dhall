let ServiceInstance = ./handlers/ServiceInstance.dhall

let ServiceDefinitionIds = ./handlers/ServiceDefinitionIds.dhall

in  λ(instance : ServiceInstance) →
      let f =
            merge
              { `2e1bbf3-b425-46cd-a03e-927f73abcaaf` =
                  ./handlers/azure-devops.dhall
              , d90c2b20-1d24-4592-88e7-6ab5eb147925 =
                  ./handlers/azure-function.dhall
              , `22e1bbf3-b425-46cd-a03e-927f73abcaaf` =
                  ./handlers/azure-devops.dhall
              }
              instance.serviceDefinitionId

      in  f instance
