import * as fs from 'node:fs';
import * as path from 'node:path';

const PRISMA_FILE_PATH = path.join(__dirname, '..', 'db', 'prisma', 'schema.prisma');
console.log(`Copying from ${PRISMA_FILE_PATH}`);

function parseLine(line: string, cachedLines: string[], onEnum: boolean): boolean {
  if (onEnum) {
    const enumEndMatch = line.match(/}/);
    if (enumEndMatch) {
      cachedLines.push(`${line} as const;`);

      // Push an empty line just to separate the enums
      cachedLines.push('');

      return false;
    }

    let patchedLine: string;

    const enumValueMapMatch = line.match(/.+?(?=@map\(".+"\))/);
    if (enumValueMapMatch) {
      const trimmedEnumValue = enumValueMapMatch[0].trim();
      patchedLine = `  '${trimmedEnumValue}': '${trimmedEnumValue}',`;
    } else {
      const trimmedEnumValue = line.trim();
      patchedLine = `  '${trimmedEnumValue}': '${trimmedEnumValue}',`;
    }

    cachedLines.push(patchedLine);

    return true;
  } else {
    const enumStartMatch = line.match(/^enum\s+(\S+)\s*\{/);
    if (enumStartMatch) {
      const patchedLine = `export const ${enumStartMatch[1]} = {`;
      cachedLines.push(patchedLine);
      return true;
    }
    return false;
  }
}

async function copyPrismaEnums() {
  const text = await fs.promises.readFile(PRISMA_FILE_PATH, 'utf8');

  const textAsArray = text.split('\n');

  const cachedLines: string[] = [];

  // We take a major assumption that no matter what,
  // the first line will never be an enum
  let onEnum = false;

  for (let i = 0; i < textAsArray.length; i++) {
    onEnum = parseLine(textAsArray[i], cachedLines, onEnum);
  }

  await fs.promises.writeFile('./index.ts', cachedLines.join('\n'));
}

copyPrismaEnums().then((_) => console.log('Copied enums from prisma_schema'));
