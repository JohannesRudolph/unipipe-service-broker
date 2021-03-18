// reexport asserts from stdlib
export { assertEquals } from "https://deno.land/std@0.90.0/testing/asserts.ts";

export async function withTempDir(f: (tmp: string) => Promise<void>): Promise<void> {
  const tmp = await Deno.makeTempDir();

  try {
    return await f(tmp);
  } finally {
    await Deno.remove(tmp, { recursive: true });
  }
}
