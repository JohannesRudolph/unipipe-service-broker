import { path } from "./deps.ts";
import { Dir, write } from "./dir.ts";
import { MeshMarketplaceContext } from "./mesh.ts";
import { readInstance, ServiceInstance } from "./osb.ts";

interface InstanceHandler {
  readonly name: string;
  handle(instance: ServiceInstance): Dir | null;
}

interface VpcServiceParameters {
  cidr: string;
  region: string;
}

class VpcHandler implements InstanceHandler {
  readonly name = "VPC Handler";

  handle(service: ServiceInstance): Dir | null {
    const params: VpcServiceParameters = service.instance
      .parameters as unknown as VpcServiceParameters;
    const context: MeshMarketplaceContext = service.instance
      .context as MeshMarketplaceContext;

    return {
      name: "customers",
      entries: [{
        name: context.customer_id,
        entries: [
          {
            name: context.project_id,
            entries: [
              { name: "params.json", content: JSON.stringify(params, null, 2) },
            ],
          },
        ],
      }],
    };
  }
}

interface TransformArgs {
  osbRepoPath: string;
  outRepoPath: string;
}

export async function transform(args: TransformArgs) {
  const handlers: Record<string, InstanceHandler> = {
    "d90c2b20-1d24-4592-88e7-6ab5eb147925": new VpcHandler(),
  };

  const instancesPath = path.join(args.osbRepoPath, "instances");

  // might be able to "parallelize" using Promise.all
  for await (const dir of Deno.readDir(instancesPath)) {
    if (!dir.isDirectory) {
      continue;
    }

    const ip = path.join(instancesPath, dir.name);
    const instance = await readInstance(ip);

    const handler = handlers[instance.instance.serviceDefinitionId];
    const handledBy = (handler && handler.name) || "(ho handler found)";
    console.log(
      `- ${instance.instance.serviceInstanceId} | ${instance.instance.serviceDefinitionId}: ${handledBy}`,
    );

    if (!handler) {
      continue;
    }

    const tree = handler.handle(instance);
    if (tree) {
      await write(tree, args.outRepoPath);
    }
  }
}
