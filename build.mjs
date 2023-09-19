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


const XGO = path.join(process.env.HOME, 'go/bin/xgo');
const TARGETS = 'linux/arm64,linux/amd64,darwin/arm64,darwin/amd64';

if (output.success) {
  console.log('Compiling native binaries...')
  const proc = Bun.spawnSync([
    XGO,
    "-go", "1.20.3",
    "-out", "release/blipgloss",
    `--targets=${TARGETS}`,
    "-ldflags=-s -w",
    "-buildmode=c-shared",
    ".",
  ]);
  console.log(proc.stdout.toString())
}
