let ServiceInstance = ./ServiceInstance.dhall

let AzureFunctionDirStructure =
    -- compute an output directory tree compatible with dhall to-directory-tree command
    -- this is not necessarily pretty when looking at nested maps, but unfortunately there's not a better dhall native
    -- way for now
      { functions : Text }

let provision =
      λ(instance : ServiceInstance) →
        { functions = instance.serviceInstanceId } : AzureFunctionDirStructure

in  { Dir = AzureFunctionDirStructure, provision }
