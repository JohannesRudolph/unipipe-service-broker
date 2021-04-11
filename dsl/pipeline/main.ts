import Denomander from "./deps.ts";
import { InstanceHandler } from "./handler.ts";
import { transform } from "./commands/transform.ts";
import { status } from "./commands/status.ts";

const program = new Denomander({
  app_name: "UniPipe CLI",
  app_description: "Supercharge your GitOps service pipelines",
  app_version: "0.1.0",
});

program
  // transform
  .command(
    "transform [repo] [handlers]",
    "Transform service instances stored in a UniPipe OSB git repo using the specified handlers",
  )
  .option(
    "-x --xport-repo",
    "Path to the target git repository. If not specified the transform runs in place on the OSB git repo.",
  )
  .action(async (args: { "repo": string; "handlers": string }) => {
    const opts = {
      osbRepoPath: args.repo,
      outRepoPath: program["xport-repo"] || args.repo,
    };

    console.log(`Loading handlers as default export from module ${args.handlers}.`);
    
    const handlersModule = await import(
      args.handlers
    );
    const handlers: Record<string, InstanceHandler> = handlersModule.default;

    console.debug(`loaded handlers`, handlers);
    
    await transform(opts, handlers);
  })

  // status
  .command(
    "status [repo]",
    "Lists service instances status stored in a UniPipe OSB git repo.",
  )
  .action(async (args: { "repo": string;}) => {
    await status(args.repo);
  })
  .parse(Deno.args);
