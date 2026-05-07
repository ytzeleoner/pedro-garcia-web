#!/usr/bin/env node
/**
 * sync.mjs — Copia la capa wiki/ de la bóveda Obsidian al repo web.
 *
 * Uso:
 *   npm run sync            ← copia vault/wiki/ → src/content/wiki/
 *   npm run sync -- --dry   ← muestra qué se copiaría sin hacer nada
 *
 * Ejecutar antes de `git add` + `git push` cuando hayas editado el wiki.
 */

import { cpSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import { homedir } from 'os';

const VAULT_WIKI = resolve(
  homedir(),
  'Library/CloudStorage/GoogleDrive-ytzeleoner@gmail.com/Mi unidad/obsidian/notebookLM/NotebookLM/wiki'
);
const DEST = new URL('./src/content/wiki', import.meta.url).pathname;
const DRY = process.argv.includes('--dry');

if (!existsSync(VAULT_WIKI)) {
  console.error(`❌ No se encuentra la bóveda en:\n   ${VAULT_WIKI}`);
  console.error('   ¿Está montado Google Drive?');
  process.exit(1);
}

if (DRY) {
  console.log('🔍 Dry run — nada se copiará');
  console.log(`   Origen:  ${VAULT_WIKI}`);
  console.log(`   Destino: ${DEST}`);
  process.exit(0);
}

cpSync(VAULT_WIKI, DEST, { recursive: true, force: true });

console.log('✅ Wiki sincronizado');
console.log(`   ${VAULT_WIKI}`);
console.log(`   → ${DEST}`);
console.log('\nPróximos pasos:');
console.log('   git add src/content/wiki');
console.log('   git commit -m "sync: actualizar wiki"');
console.log('   git push');
