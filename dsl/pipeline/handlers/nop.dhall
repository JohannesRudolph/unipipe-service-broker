let ServiceInstance = ./ServiceInstance.dhall

let DirLayout =
    -- nothing to output
      {}

let provision = λ(instance : ServiceInstance) → {=} : DirLayout

in  { DirLayout, provision }
