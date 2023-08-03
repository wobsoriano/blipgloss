import dts from 'bun-plugin-dts'

const output = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  external: ['bun:ffi'],
  plugins: [
    dts()
  ],
})

if (output.success) {
  console.log('Building')
  const proc = Bun.spawn(['bun', 'run', 'build:go'])
  await proc.exited
  console.log('build success')
}
