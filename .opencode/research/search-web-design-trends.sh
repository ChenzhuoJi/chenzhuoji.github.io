#!/usr/bin/env bash
# =============================================================================
# AnySearch API — 5 Searches for Modern Web Design Trends Research
# =============================================================================
# Usage:  bash .opencode/research/search-web-design-trends.sh
# Output: JSON results saved to .opencode/research/result-*.json
# =============================================================================

set -euo pipefail

API="https://api.anysearch.com/v1/search"
TOKEN="as_sk_03718fa0f1d86ae24a29ca6e040a96ed"
OUTDIR="$(dirname "$0")"

echo "=== AnySearch API Research: Modern Web Design Trends ==="
echo ""

# ---------------------------------------------------------------------------
# Search 1: 2025–2026 web design trends – typography & minimal blog
# ---------------------------------------------------------------------------
echo ">>> [1/5] Typography & Minimal Blog Trends 2025/2026 ..."
curl -s -X POST "$API" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "2025 2026 web design trends typography minimal blog", "max_results": 5}' \
  | tee "$OUTDIR/result-1-typography-trends.json" | python3 -m json.tool 2>/dev/null || true
echo ""

# ---------------------------------------------------------------------------
# Search 2: Japanese-inspired web design – color palette & modern
# ---------------------------------------------------------------------------
echo ">>> [2/5] Japanese Inspired Web Design & Color Palette ..."
curl -s -X POST "$API" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "Japanese inspired web design color palette modern", "max_results": 5}' \
  | tee "$OUTDIR/result-2-japanese-palette.json" | python3 -m json.tool 2>/dev/null || true
echo ""

# ---------------------------------------------------------------------------
# Search 3: CSS layout design principles – CRAP (contrast, repetition, alignment, proximity)
# ---------------------------------------------------------------------------
echo ">>> [3/5] CSS Layout Design Principles (CRAP) ..."
curl -s -X POST "$API" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "CSS layout design principles alignment contrast repetition proximity blog", "max_results": 5}' \
  | tee "$OUTDIR/result-3-css-crap-principles.json" | python3 -m json.tool 2>/dev/null || true
echo ""

# ---------------------------------------------------------------------------
# Search 4: Modern blog design system – font pairing 2025
# ---------------------------------------------------------------------------
echo ">>> [4/5] Modern Blog Design System & Font Pairing 2025 ..."
curl -s -X POST "$API" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "modern blog design system font pairing 2025", "max_results": 5}' \
  | tee "$OUTDIR/result-4-font-pairing.json" | python3 -m json.tool 2>/dev/null || true
echo ""

# ---------------------------------------------------------------------------
# Search 5: Top-tier personal blog design inspiration 2025/2026
# ---------------------------------------------------------------------------
echo ">>> [5/5] Top-Tier Personal Blog Design Inspiration ..."
curl -s -X POST "$API" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "top tier personal blog design inspiration 2025 2026", "max_results": 5}' \
  | tee "$OUTDIR/result-5-blog-inspiration.json" | python3 -m json.tool 2>/dev/null || true
echo ""

echo "=== All searches complete ==="
echo "Results saved to $OUTDIR/result-*.json"
