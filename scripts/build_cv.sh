#!/bin/sh
# Gera curriculo-arthur-marinho.pdf a partir de cv/curriculo.html (Google Chrome headless).
# Uso: sh scripts/build_cv.sh
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
TMP="$(mktemp -d)"
mkdir -p "$TMP/cv" "$TMP/assets/fonts"
cp "$ROOT/cv/curriculo.html" "$TMP/cv/"
cp "$ROOT"/assets/fonts/*.woff2 "$TMP/assets/fonts/"
cp "$ROOT/assets/sobre-foto.jpg" "$TMP/assets/"
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
  --no-pdf-header-footer --user-data-dir="$TMP/profile" \
  --print-to-pdf="$TMP/cv.pdf" "file://$TMP/cv/curriculo.html" >/dev/null 2>&1
cp "$TMP/cv.pdf" "$ROOT/curriculo-arthur-marinho.pdf"
rm -rf "$TMP"
echo "OK: curriculo-arthur-marinho.pdf"
