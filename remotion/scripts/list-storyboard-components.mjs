#!/usr/bin/env bun
import {registry} from '../src/storyboard/registry.ts';

// Allow piping to `head`/`sed` without noisy stack traces.
process.stdout.on('error', (err) => {
  if (err?.code === 'EPIPE') process.exit(0);
  throw err;
});

const args = process.argv.slice(2);
const formatArg = args.find((a) => a.startsWith('--format='));
const format = (formatArg ? formatArg.split('=')[1] : 'md').toLowerCase();

const unwrapEffects = (schema) => {
  // ZodEffects wraps the inner schema in _def.schema.
  // We keep unwrapping so type rendering works.
  // eslint-disable-next-line no-constant-condition
  while (schema?._def?.typeName === 'ZodEffects' && schema?._def?.schema) {
    schema = schema._def.schema;
  }
  return schema;
};

const baseTypeName = (schema) => unwrapEffects(schema)?._def?.typeName ?? 'Unknown';

const isOptionalLike = (schema) => {
  schema = unwrapEffects(schema);
  const t = schema?._def?.typeName;
  return t === 'ZodOptional' || t === 'ZodDefault';
};

const unwrapOptionalLike = (schema) => {
  schema = unwrapEffects(schema);
  // Optional/default/nullable all wrap innerType.
  while (true) {
    const t = schema?._def?.typeName;
    if (t === 'ZodOptional' || t === 'ZodDefault' || t === 'ZodNullable') {
      schema = schema._def.innerType;
      schema = unwrapEffects(schema);
      continue;
    }
    break;
  }
  return schema;
};

const zodToTypeString = (schema) => {
  schema = unwrapOptionalLike(schema);
  schema = unwrapEffects(schema);

  const t = schema?._def?.typeName;
  switch (t) {
    case 'ZodString':
      return 'string';
    case 'ZodNumber':
      return 'number';
    case 'ZodBoolean':
      return 'boolean';
    case 'ZodLiteral':
      return `literal(${JSON.stringify(schema._def.value)})`;
    case 'ZodEnum':
      return `enum(${schema._def.values.map((v) => JSON.stringify(v)).join(' | ')})`;
    case 'ZodNativeEnum':
      return 'nativeEnum';
    case 'ZodArray':
      return `${zodToTypeString(schema._def.type)}[]`;
    case 'ZodObject':
      return 'object';
    case 'ZodUnion':
      return `(${schema._def.options.map(zodToTypeString).join(' | ')})`;
    case 'ZodDiscriminatedUnion':
      return 'discriminatedUnion';
    case 'ZodRecord':
      return `record<${zodToTypeString(schema._def.keyType)}, ${zodToTypeString(schema._def.valueType)}>`;
    case 'ZodTuple':
      return `[${schema._def.items.map(zodToTypeString).join(', ')}]`;
    case 'ZodAny':
      return 'any';
    case 'ZodUnknown':
      return 'unknown';
    default:
      return t ?? 'unknown';
  }
};

const getObjectShape = (schema) => {
  schema = unwrapOptionalLike(schema);
  schema = unwrapEffects(schema);
  if (schema?._def?.typeName !== 'ZodObject') return null;
  // Zod v3 stores shape as a function on _def.
  if (typeof schema._def.shape === 'function') return schema._def.shape();
  // Fallback: some builds expose .shape.
  return schema.shape ?? null;
};

const describeProps = (propsSchema) => {
  const shape = getObjectShape(propsSchema);
  if (!shape) return null;

  // Instructor-facing docs: hide deprecated/not-recommended fields.
  // We keep runtime compatibility (schemas/components may still accept these),
  // but we don't want to encourage new usage.
  const HIDDEN_PROPS = new Set(['badge', 'callouts']);

  const out = {};
  for (const [key, fieldSchema] of Object.entries(shape)) {
    if (HIDDEN_PROPS.has(key)) continue;
    out[key] = {
      optional: isOptionalLike(fieldSchema),
      type: zodToTypeString(fieldSchema),
    };
  }
  return out;
};

const rows = Object.entries(registry).map(([name, def]) => {
  const props = describeProps(def.propsSchema);
  return {
    name,
    props,
  };
});

if (format === 'json') {
  process.stdout.write(`${JSON.stringify({components: rows}, null, 2)}\n`);
  process.exit(0);
}

// Default: Markdown
process.stdout.write(`# Storyboard Components\n\n`);
process.stdout.write(
  `Generated from \`remotion/src/storyboard/registry.ts\`. Run:\n\n` +
    '```bash\n' +
    'cd remotion\n' +
    'bun scripts/list-storyboard-components.mjs --format=md\n' +
    '```\n\n',
);

process.stdout.write(`## Index\n\n`);
process.stdout.write(`| Component |\n|---|\n`);
for (const c of rows) {
  process.stdout.write(`| [\`${c.name}\`](#${c.name.toLowerCase()}) |\n`);
}
process.stdout.write('\n');

for (const c of rows) {
  process.stdout.write(`## ${c.name}\n`);
  if (!c.props) {
    process.stdout.write(`Props: (non-object schema, inspect source)\n\n`);
    continue;
  }

  process.stdout.write(`| Prop | Type | Optional |\n|---|---|---|\n`);
  for (const [k, v] of Object.entries(c.props)) {
    process.stdout.write(`| \`${k}\` | \`${v.type}\` | ${v.optional ? 'yes' : 'no'} |\n`);
  }
  process.stdout.write('\n');
}
