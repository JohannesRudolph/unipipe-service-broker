import {
  DEFAULT_SCHEMA,
  parse as parseYaml,
  ParseOptions,
} from "https://deno.land/std@0.90.0/encoding/yaml.ts";

// note: it's a bit ugly that we have to foray into the private parts of the stdlib, but otherwise we can't configure
import { Type } from "https://deno.land/std@0.90.0/encoding/_yaml/type.ts";
import { Schema } from "https://deno.land/std@0.90.0/encoding/_yaml/schema.ts";

const PlatformContextType = new Type("PlatformContext", {
  kind: "mapping",
});

const OSB_SCHEMA = new Schema({
  explicit: [PlatformContextType],
  include: [DEFAULT_SCHEMA],
});

export function parse(content: string, options?: ParseOptions): unknown {
  return parseYaml(content, options || { schema: OSB_SCHEMA });
}
