import { parse } from "./yaml.ts";
import { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

export interface OsbServiceInstance {
  serviceInstanceId: string;
  serviceDefinitionId: string;

  // todo: technically we know a bit better
  originatingIdentity: Record<string, unknown>;
  parameters: Record<string, unknown>;
  context: Record<string, unknown>;

  // todo: more fields
}

export interface OsbServiceBinding {
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

export interface OsbServiceInstanceStatus {
  status: "succeeded" | "failed";
  description: string;
}


export interface ServiceInstance {
  instance: OsbServiceInstance;
  bindings: OsbServiceBinding[];
  status: OsbServiceInstanceStatus | null;
}

/**
 * Parse a yaml file, throwing an error if it fails.
 * @param path 
 * @returns 
 */
export async function parseYamlFile(path: string) {
  const yml = await Deno.readTextFile(path);

  return parse(yml);
}
/**
 * Attempts to parse a yaml file, returning null if the file does not exist or the YAML fails to parse.
 * @param path 
 * @returns 
 */
export async function tryParseYamlFile(path: string) {
  try {
    const yml = await Deno.readTextFile(path);
    return parse(yml);
  } catch (error) {
    console.debug(`Encountered tolerable error parsing ${path}: ` + error);
    return null;
  }
}

export async function readInstance(path: string): Promise<ServiceInstance> {
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
