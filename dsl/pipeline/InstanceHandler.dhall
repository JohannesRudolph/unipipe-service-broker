let OSB = ./OSB/package.dhall

let Action = ./Action.dhall

in  { provision : OSB.ServiceInstance → List Action, deprovision : OSB.ServiceInstance → List Action }
