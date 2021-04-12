import Denomander from "./deps.ts";
import { InstanceHandler } from "./handler.ts";
import { transform, TransformArgs } from "./commands/transform.ts";
import { status } from "./commands/status.ts";

const program = new Denomander({
  app_name: "UniPipe CLI",
  app_description: "Supercharge your GitOps service pipelines",
  app_version: "0.1.0",
});

program
  // transform
  .command(
    "transform [repo]",
    "Transform service instances stored in a UniPipe OSB git repo using the specified handlers",
  )
  .requiredOption(
    "-h --handlers",
    "A registry of handlers for processing service instance transformation. These can be defined in either javascript or typescript as a JSON object with service ids as keys and handler objects as values. Note: typescript registries are not supported in single-binary builds of unipipe-cli.",
  )
  .option(
    "-x --xport-repo",
    "Path to the target git repository. If not specified the transform runs in place on the OSB git repo.",
  )
  .action(async (args: { "repo": string }) => {
    const opts: TransformArgs = {
      osbRepoPath: args.repo,
      outRepoPath: program["xport-repo"] || args.repo,
      handlers: program["handlers"],
    };

    await transform(opts);
  })
  // status
  .command(
    "status [repo]",
    "Lists service instances status stored in a UniPipe OSB git repo.",
  )
  .action(async (args: { "repo": string }) => {
    await status(args.repo);
  })
  .parse(Deno.args);
