import { parse } from "./yaml.ts";

interface OsbServiceInstance {
  serviceInstanceId: string;
  serviceDefinitionId: string;

  // todo: technically we know a bit better
  originatingIdentity: Record<string, unknown>;
  parameters: Record<string, unknown>;
  context: Record<string, unknown>;

  // todo: more fields
}

interface OsbServiceBinding {
  bindingId: string;
  serviceInstanceId: string;
  serviceDefinitionId: string;
  planId: string;

  // todo: technically we know a bit better
  originatingIdentity: Record<string, unknown>;
  parameters: Record<string, unknown>;
  bindResource: Record<string, unknown>;
  context: Record<string, unknown>;

  deleted: boolean;
}

interface OsbServiceInstanceStatus {
  status: "succeeded" | "failed";
  description: string;
}

interface ServiceInstance {
  instance: OsbServiceInstance;
  bindings: OsbServiceBinding[];
  status: OsbServiceInstanceStatus | null;
}

async function parseYamlFile(path: string) {
  const yml = await Deno.readTextFile(path);

  return parse(yml);
}

/**
 * Attempts to parse a yaml file, returning null if the file does not exist or the YAML fails to parse.
 * @param path 
 * @returns 
 */
async function tryParseYamlFile(path: string) {
  try {
    const yml = await Deno.readTextFile(path);

    return parse(yml);
  } catch (error) {
    console.debug(`Encountered expected error parsing ${path}: ` + error);
    return null;
  }
}

async function readInstance(path: string): Promise<ServiceInstance> {
  const instance = await parseYamlFile(
    `${path}/instance.yml`,
  ) as OsbServiceInstance;

  const status = await tryParseYamlFile(`${path}/status.yml`) as
    | OsbServiceInstanceStatus
    | null;

  return {
    instance: instance,
    bindings: [], // todo parse binding files, note that bindings have also a status file
    status: status, // todo parse status file
  };
}

async function main(args: string[]) {
  const [osbRepoPath, outRepoPath] = args;

  const instancesPath = `${osbRepoPath}/instances`;

  for await (const dir of Deno.readDir(instancesPath)) {
    if (dir.isDirectory) {
      const x = await readInstance(`${instancesPath}/${dir.name}`);
      console.log(x);
    }
  }
}

await main(Deno.args);
