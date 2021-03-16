import { parse } from "./yaml.ts";
 

async function readInstance(path: string) {
  const instanceYml = await Deno.readTextFile(`${path}/instance.yml`);

  return {
    instance: parse(instanceYml)
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
