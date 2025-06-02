const TARGETS = 'windows/amd64,linux/amd64,linux/arm64,darwin/arm64'

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
