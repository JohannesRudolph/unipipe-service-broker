let ServiceInstance = ./handlers/ServiceInstance.dhall

let ServiceDefinitionIds = ./handlers/ServiceDefinitionIds.dhall

let devops = ./handlers/azure-devops.dhall

let function = ./handlers/azure-function.dhall

let Dir = < DevOps : devops.Dir | Function : function.Dir >

in  λ(instance : ServiceInstance) →
      merge
        { `2e1bbf3-b425-46cd-a03e-927f73abcaaf` =
            Dir.DevOps (devops.provision instance)
        , d90c2b20-1d24-4592-88e7-6ab5eb147925 =
            Dir.Function (function.provision instance)
        , `22e1bbf3-b425-46cd-a03e-927f73abcaaf` =
            Dir.DevOps (devops.provision instance)
        }
        instance.serviceDefinitionId
