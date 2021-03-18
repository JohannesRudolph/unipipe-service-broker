import * as stdPath from "https://deno.land/std@0.90.0/path/mod.ts";

// re-export path
export const path = stdPath;

export interface Dir {
  name: string;
  entries: (File | Dir)[];
}

export interface File {
  name: string;
  content: string;
}

function isFile(x: File | Dir): x is File {
  return !!(x as File).content;
}


function isDir(x: File | Dir): x is Dir {
  return !isFile(x);
}

/**
 * Writes a directory tree to the filesystem. beginning at the specified path.
 * Note: maybe consider using Promise.all for speed
 * 
 * @param currentDir 
 * @param basePath 
 */
export async function write(currentDir: Dir, basePath: string) {
  const currentPath = path.join(basePath, currentDir.name);
  
  // ensure dir exists, mkdir -p
  await Deno.mkdir(currentPath, { recursive: true });

  const files = currentDir.entries.filter(isFile);
  for await (const file of files) {
    const fp = path.join(currentPath, file.name);
    await Deno.writeTextFile(fp, file.content);
  }

  const dirs = currentDir.entries.filter(isDir);
  for await (const dir of dirs) {
    await write(dir, currentPath); // recurse
  }
}
