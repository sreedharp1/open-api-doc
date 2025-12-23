import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import wap from 'webapi-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Read the APIs config
const configPath = join(rootDir, 'src/config/apis.json');
const config = JSON.parse(readFileSync(configPath, 'utf-8'));

// Find RAML APIs
const ramlApis = config.apis.filter(api => api.type === 'raml');

if (ramlApis.length === 0) {
  console.log('No RAML files to convert.');
  process.exit(0);
}

async function convertRamlFiles() {
  const { WebApiParser } = wap;

  for (const api of ramlApis) {
    const ramlPath = join(rootDir, 'public', api.specPath);
    const outputPath = ramlPath.replace(/\.raml$/, '.converted.yaml');

    if (!existsSync(ramlPath)) {
      console.warn(`RAML file not found: ${ramlPath}`);
      continue;
    }

    console.log(`Converting ${api.name} (${ramlPath})...`);

    try {
      const ramlContent = readFileSync(ramlPath, 'utf-8');
      const model = await WebApiParser.raml10.parse(ramlContent);
      const resolved = await WebApiParser.raml10.resolve(model);
      const oas30 = await WebApiParser.oas30.generateString(resolved);

      writeFileSync(outputPath, oas30);
      console.log(`  -> ${outputPath}`);
    } catch (error) {
      console.error(`  Error converting ${api.name}:`, error.message);
    }
  }
}

convertRamlFiles().catch(console.error);
