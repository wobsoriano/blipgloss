import dts from 'bun-plugin-dts'
import path from 'node:path'

const output = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  external: ['bun:ffi'],
  plugins: [
    dts()
  ],
  target: 'bun'
})

const TARGETS = 'darwin/arm64,darwin/amd64,linux/amd64,linux/arm64,windows/amd64';

if (output.success) {
  console.log('Compiling native binaries...')
  const proc = Bun.spawnSync([
    "xgo",
    "-v",
    "-out", "release/blipgloss",
    `--targets=${TARGETS}`,
    "-ldflags=-s -w",
    "-buildmode=c-shared",
    ".",
  ]);
  console.log(proc.stdout.toString())
}
