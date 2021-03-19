import Denomander from "./deps.ts";
import { transform } from "./transform.ts";

const program = new Denomander({
  app_name: "UniPipe CLI",
  app_description: "Supercharge your GitOps service pipelines",
  app_version: "0.1.0",
});

program
  .command(
    "transform [repo]",
    "Transform service instances stored in a UniPipe OSB git repo using the specified handlers",
  )
  .option(
    "-x --xport-repo",
    "Path to the target git repository. If not specified the transform runs in place on the OSB git repo.",
  )
  .action(async (args: { "repo": string }) => {
    const opts = {
      osbRepoPath: args.repo,
      outRepoPath: program["xport-repo"] || args.repo,
    };

    await transform(opts);
  })
  .parse(Deno.args);
