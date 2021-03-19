// this file is a central collection of our dependencies

// this is a deno best practice https://deno.land/manual@v1.7.4/examples/manage_dependencies
// for  discussion of the performance implications (and why this doesn't matter much for this _app_) see https://github.com/denoland/deno/issues/6194

export * as path from "https://deno.land/std@0.90.0/path/mod.ts";
export * as yaml from "https://deno.land/std@0.90.0/encoding/yaml.ts";

// note: it's a bit ugly that we have to foray into the private parts of the stdlib, but otherwise we can't configure
// the options we need
export { Type as YamlType } from "https://deno.land/std@0.90.0/encoding/_yaml/type.ts";
export { Schema as YamlSchema } from "https://deno.land/std@0.90.0/encoding/_yaml/schema.ts";

import Denomander from "https://deno.land/x/denomander@0.8.1/mod.ts";
export default Denomander; 
