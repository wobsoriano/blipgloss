const { platform, arch } = process;
const { join } = require('path');

const PLATFORM_MAP = {
  darwin: {
    arm64: 'darwin-arm64',
    x64: 'darwin-amd64'
  },
  linux: {
    arm64: 'linux-arm64',
    x64: 'linux-amd64'
  },
  win32: {
    x64: 'windows-amd64'
  }
};

async function downloadBinary() {
  const platformKey = PLATFORM_MAP[platform]?.[arch];
  if (!platformKey) {
    console.error(`Unsupported platform: ${platform}-${arch}`);
    process.exit(1);
  }

  const version = require('../package.json').version;
  const binaryName = `blipgloss-${platformKey}`;
  const url = `https://github.com/wobsoriano/blipgloss/releases/download/v${version}/${binaryName}`;
  const outputPath = join(__dirname, '..', 'bin', binaryName);

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
    if (platform !== 'win32') {
      await Bun.write(outputPath, await Bun.file(outputPath).arrayBuffer(), { mode: 0o755 });
    }

    console.log(`Downloaded ${binaryName} successfully!`);
  } catch (err) {
    console.error('Failed to download binary:', err);
    process.exit(1);
  }
}

downloadBinary(); 
