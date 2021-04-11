import { path } from "./deps.ts";
import { write } from "./dir.ts";
import { InstanceHandler } from "./handler.ts";
import { readInstance } from "./osb.ts";

interface TransformArgs {
  osbRepoPath: string;
  outRepoPath: string;
}

export async function transform(
  args: TransformArgs,
  handlers: Record<string, InstanceHandler>,
) {
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
      `- instance id: ${instance.instance.serviceInstanceId} | definition id: ${instance.instance.serviceDefinitionId} -> ${handledBy}`,
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
