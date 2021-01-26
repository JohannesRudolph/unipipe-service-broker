let UniPipe = ../UniPipe/package.dhall

in    { provision =
            λ(instance : UniPipe.OSB.ServiceInstance)
          → let w
                : UniPipe.WriteFile
                = { relativePath = instance.serviceDefinitionId, content = "x" }

            in  [ UniPipe.Action.WriteFile w ]
      , deprovision =
          λ(instance : UniPipe.OSB.ServiceInstance) → [] : List UniPipe.Action
      }
    : UniPipe.InstanceHandler
