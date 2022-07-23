import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  format: ['cjs', 'esm'],
  external: ['bun:ffi'],
  dts: true,
  onSuccess: "bun run build:go"
});
