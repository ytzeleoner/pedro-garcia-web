#!/bin/bash
# publicar.sh — Sincroniza la bóveda y publica la web
#
# Uso:
#   ./publicar.sh                   ← sync + commit automático + push
#   ./publicar.sh "mensaje custom"  ← mismo pero con mensaje de commit propio
#   ./publicar.sh --dry             ← muestra qué haría sin hacer nada

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# ── Colores ────────────────────────────────────────────────────────────────
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

ok()   { echo -e "${GREEN}✓${NC} $*"; }
info() { echo -e "${YELLOW}→${NC} $*"; }
err()  { echo -e "${RED}✗${NC} $*"; exit 1; }

# ── Argumentos ────────────────────────────────────────────────────────────
DRY=false
COMMIT_MSG=""
for arg in "$@"; do
  case "$arg" in
    --dry) DRY=true ;;
    *)     COMMIT_MSG="$arg" ;;
  esac
done

if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="sync: publicar wiki $(date '+%Y-%m-%d')"
fi

echo ""
echo "  pedro-garcia-web — publicar"
echo "  ─────────────────────────────"
[ "$DRY" = true ] && echo -e "  ${YELLOW}Modo dry run — no se ejecuta nada${NC}\n"

# ── 1. Sincronizar wiki desde la bóveda ───────────────────────────────────
info "Sincronizando wiki desde la bóveda Obsidian..."
if [ "$DRY" = true ]; then
  node sync.mjs --dry
else
  node sync.mjs
fi
ok "Wiki sincronizado"

# ── 2. Comprobar si hay cambios ────────────────────────────────────────────
CHANGES=$(git status --porcelain 2>/dev/null)
if [ -z "$CHANGES" ]; then
  ok "Sin cambios — la web ya está al día"
  exit 0
fi

info "Cambios detectados:"
git status --short

# ── 3. Build local para verificar antes de publicar ───────────────────────
info "Verificando build..."
if [ "$DRY" = true ]; then
  echo "   (build omitido en dry run)"
else
  npm run build -- --silent 2>&1 | tail -3
  ok "Build correcto"
fi

# ── 4. Commit y push ──────────────────────────────────────────────────────
if [ "$DRY" = false ]; then
  git add src/content/wiki
  git commit -m "$COMMIT_MSG"
  ok "Commit: $COMMIT_MSG"

  info "Publicando en GitHub Pages..."
  git push origin master
  ok "Push completado"
fi

echo ""
echo -e "  ${GREEN}¡Listo!${NC} En ~2 minutos la web estará actualizada en:"
echo "  https://ytzeleoner.github.io/pedro-garcia-web"
echo ""
