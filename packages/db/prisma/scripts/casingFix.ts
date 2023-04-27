import * as fs from 'fs';
import * as path from 'path';
import * as pluralize from 'pluralize';

const PRISMA_FILE_PATH = path.join(__dirname, '../schema.prisma');
console.log('editing the file at :' + PRISMA_FILE_PATH);

function snakeToCamel(str: string) {
  return str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());
}

function snakeToPascal(str: string) {
  return snakeToCamel(str).replace(/^\w/, (c) => c.toUpperCase());
}

const PRISMA_PRIMITIVES = ['String', 'Boolean', 'Int', 'Float', 'DateTime'];
const KNEX_INTERNAL_MODELS = [
  'knex_migrations',
  'knex_migrations_lock',
  'pgmigrations',
];

function isKnexInternalModel(typeName: string) {
  return KNEX_INTERNAL_MODELS.includes(typeName);
}

function isPrimitiveType(typeName: string) {
  return PRISMA_PRIMITIVES.includes(typeName);
}

function fixFieldsArrayString(fields: string) {
  return fields
    .split(', ')
    .map((field) => snakeToCamel(field))
    .join(', ');
}

function parseLine(line: string, persistentData: {
  currentModelName: string | null,
  hasAddedModelMap: boolean,
}, fixedText: string[]) {
  // Are we at the start of a model definition
  const modelMatch = line.match(/^model\s+(\S+)\s*\{/);
  if (modelMatch) {
    persistentData.currentModelName = modelMatch[1];
    if (isKnexInternalModel(persistentData.currentModelName)) {
      return;
    }
    persistentData.hasAddedModelMap = false;
    const pascalModelName = snakeToPascal(persistentData.currentModelName);
    fixedText.push(`model ${pascalModelName} {`);
    return;
  }

  if (persistentData.currentModelName && isKnexInternalModel(persistentData.currentModelName)) {
    return;
  }

  // We don't need to change anything if we aren't in a model body
  if (!persistentData.currentModelName) {
    fixedText.push(line);
    return;
  }

  // scan to see if @@map was already added
  if (line.match(/\s+@@map\(/)) {
    if (persistentData.hasAddedModelMap) {
      // @@map already added, dont add again
      return;
    } else {
      persistentData.hasAddedModelMap = true;
    }
  }

  // Add the @@map to the table name for the model
  else if (!persistentData.hasAddedModelMap) {
    if (line.match(/\s+@@/)) {
      fixedText.push(`  @@map("${persistentData.currentModelName}")`);
      persistentData.hasAddedModelMap = true;
    }
    if (line === '}' || line === '}\r') {
      fixedText.push(`\n  @@map("${persistentData.currentModelName}")`);
      fixedText.push(`}`);
      persistentData.hasAddedModelMap = true;
      return;
    }
  }

  // Renames field and applies a @map to the field name if it is snake case
  // Adds an s to the field name if the type is an array relation
  const fieldMatch = line.match(/\s\s(\w+)\s+(\w+)(\[\])?/);
  let fixedLine = line;
  if (fieldMatch) {
    const [, currentFieldName, currentFieldType, isArrayType] = fieldMatch;

    let fixedFieldName = snakeToCamel(currentFieldName);
    if (isArrayType && !pluralize.isPlural(fixedFieldName)) {
      fixedFieldName = pluralize.plural(fixedFieldName);
    }

    fixedLine = fixedLine.replace(currentFieldName, fixedFieldName);

    // Add map if we needed to convert the field name and the field is not a relational type
    // If it's relational, the field type will be a non-primitive, hence the isPrimitiveType check
    if (currentFieldName.includes('_') && isPrimitiveType(currentFieldType)) {
      //check if fixedLine contains /r
      if (fixedLine.includes('\r')) {
        //remove /r
        fixedLine = fixedLine.replace('\r', '');
      }
      //add @map
      fixedLine += `  @map("${currentFieldName}")`;
    }
  }

  // Capitalizes model names in field types
  const fieldTypeMatch = fixedLine.match(/\s\s\w+\s+(\w+)/);
  if (fieldTypeMatch) {
    const currentFieldType = fieldTypeMatch[1];
    const fieldTypeIndex = fieldTypeMatch[0].lastIndexOf(currentFieldType);
    const fixedFieldType = snakeToPascal(currentFieldType);
    const startOfLine = fixedLine.slice(0, fieldTypeIndex);
    const restOfLine = fixedLine.slice(fieldTypeIndex + currentFieldType.length);
    fixedLine = `${startOfLine}${fixedFieldType}${restOfLine}`;
  }

  // Changes `fields: [relation_id]` in @relation to camel case
  const relationFieldsMatch = fixedLine.match(/fields:\s\[([\w,\s]+)\]/);
  if (relationFieldsMatch) {
    const fields = relationFieldsMatch[1];
    fixedLine = fixedLine.replace(fields, fixFieldsArrayString(fields));
  }

  // Changes fields listed in @@index or @@unique to camel case
  const indexUniqueFieldsMatch = fixedLine.match(/@@\w+\(\[([\w,\s]+)\]/);
  if (indexUniqueFieldsMatch) {
    const fields = indexUniqueFieldsMatch[1];
    fixedLine = fixedLine.replace(fields, fixFieldsArrayString(fields));
  }

  fixedText.push(fixedLine);
}

async function fixPrismaFile() {
  const text = await fs.promises.readFile(PRISMA_FILE_PATH, 'utf8');

  const textAsArray = text.split('\n');

  const fixedText = [];


  const persistentData = {
    currentModelName: null,
    hasAddedModelMap: false,
  };
  for (let line of textAsArray) {
    parseLine(line, persistentData, fixedText);
  }

  await fs.promises.writeFile(PRISMA_FILE_PATH, fixedText.join('\n'));
}


fixPrismaFile()
  .then(_ => console.log('prisma file fixed'))
