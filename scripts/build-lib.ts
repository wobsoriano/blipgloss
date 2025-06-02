import dts from 'bun-plugin-dts'

const output = await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  external: ['bun:ffi'],
  plugins: [
    dts()
  ],
  target: 'bun'
})

if (output.success) {
  console.log('Built successfully')
}
