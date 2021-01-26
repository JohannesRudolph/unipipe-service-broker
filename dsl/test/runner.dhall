let UniPipe = ../UniPipe/package.dhall

in    λ(instance : UniPipe.OSB.ServiceInstance)
    → λ(handler : UniPipe.InstanceHandler)
    → handler.provision instance
