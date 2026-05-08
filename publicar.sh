#!/bin/bash
# publicar.sh — Sincroniza la bóveda y publica la web
#
# Uso desde el proyecto Astro o desde la bóveda Obsidian:
#   ./publicar.sh                   ← sync + build + commit + push
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

# ── Dependencias ──────────────────────────────────────────────────────────
command -v node >/dev/null 2>&1 || err "node no encontrado — instala Node.js"
command -v npm  >/dev/null 2>&1 || err "npm no encontrado"
command -v git  >/dev/null 2>&1 || err "git no encontrado"

# ── Argumentos ────────────────────────────────────────────────────────────
DRY=false
COMMIT_MSG=""
for arg in "$@"; do
  case "$arg" in
    --dry) DRY=true ;;
    *)     COMMIT_MSG="$arg" ;;
  esac
done
[ -z "$COMMIT_MSG" ] && COMMIT_MSG="sync: publicar wiki $(date '+%Y-%m-%d')"

# ── Rama actual ───────────────────────────────────────────────────────────
BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null) || err "No es un repositorio git"

echo ""
echo "  pedro-garcia-web — publicar"
echo "  ─────────────────────────────"
[ "$DRY" = true ] && echo -e "  ${YELLOW}Modo dry run — no se ejecuta nada${NC}"
echo ""

# ── 1. Sincronizar wiki desde la bóveda ───────────────────────────────────
info "Sincronizando wiki desde la bóveda Obsidian..."
if [ "$DRY" = true ]; then
  node sync.mjs --dry
else
  node sync.mjs
fi
ok "Wiki sincronizado"

# ── 2. Comprobar si hay cambios en todo el proyecto ───────────────────────
CHANGES=$(git status --porcelain 2>/dev/null)
if [ -z "$CHANGES" ]; then
  ok "Sin cambios — la web ya está al día"
  exit 0
fi

info "Cambios detectados:"
git status --short
echo ""

# ── 3. Build para verificar antes de publicar ─────────────────────────────
info "Verificando build..."
if [ "$DRY" = true ]; then
  echo "   (build omitido en dry run)"
else
  BUILD_OUTPUT=$(npm run build 2>&1)
  BUILD_EXIT=$?
  if [ $BUILD_EXIT -ne 0 ]; then
    echo "$BUILD_OUTPUT"
    err "Build fallido — no se ha publicado nada"
  fi
  echo "$BUILD_OUTPUT" | grep -E "Complete|page\(s\)" | tail -2
  ok "Build correcto"
fi

# ── 4. Commit y push ──────────────────────────────────────────────────────
if [ "$DRY" = false ]; then
  git add -A
  git commit -m "$COMMIT_MSG"
  ok "Commit: $COMMIT_MSG"

  info "Publicando en GitHub Pages (rama: $BRANCH)..."
  git push origin "$BRANCH"
  ok "Push completado"
fi

echo ""
echo -e "  ${GREEN}¡Listo!${NC} En ~2 minutos la web estará actualizada en:"
echo "  https://ytzeleoner.github.io/pedro-garcia-web"
echo ""
