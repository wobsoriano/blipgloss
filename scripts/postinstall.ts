import { suffix } from 'bun:ffi';

const { platform, arch } = process;

async function downloadBinary() {
  const platformKey = `${platform}-${arch === 'x64' ? 'amd64' : arch}.${suffix}`;
  if (!platformKey) {
    console.error(`Unsupported platform: ${platform}-${arch}`);
    process.exit(1);
  }

  const { version } = await Bun.file('package.json').json();
  console.log(version)
  const binaryName = `blipgloss-${platformKey}`;
  const url = `https://github.com/wobsoriano/blipgloss/releases/download/v${version}/${binaryName}`;

  const outputPath = `bin/${binaryName}`;

  console.log(`Downloading ${binaryName} for ${platformKey}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Binary not found for version ${version}. Please file an issue.`);
      } else {
        console.error(`Failed to download binary: ${response.status}`);
      }
      process.exit(1);
    }

    await Bun.write(outputPath, response);
    
    // Make binary executable (except on Windows)
    if (process.platform !== 'win32') {
      await Bun.write(outputPath, await Bun.file(outputPath).arrayBuffer(), { mode: 0o755 });
    }

    console.log(`Downloaded ${binaryName} successfully!`);
  } catch (err) {
    console.error('Failed to download binary:', err);
    process.exit(1);
  }
}

downloadBinary(); 
