// Turns an inline CSS string ("color:red;font-size:12px") into a React style object.
const kebabToCamel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

export function css(value) {
  if (typeof value !== 'string') return value;
  const out = {};
  for (const decl of value.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const prop = decl.slice(0, i).trim();
    out[prop.startsWith('--') ? prop : kebabToCamel(prop)] = decl.slice(i + 1).trim();
  }
  return out;
}
