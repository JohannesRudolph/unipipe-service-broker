-- a fictitious sample handler that makes an azure function provide info about the last provisioned service instance
-- using dhall's native text interpolation

let ServiceInstance = ./ServiceInstance.dhall

let DirLayout =
    -- compute an output directory tree compatible with dhall to-directory-tree command
    -- this is not necessarily pretty when looking at nested maps, but unfortunately there's not a better dhall native
    -- way for now
      { lastprovisioned : Text }

let provision =
      λ(instance : ServiceInstance) →
        { lastprovisioned = "The last provisioned service instance id is ${instance.serviceInstanceId}" } : DirLayout

in  { DirLayout, provision }
