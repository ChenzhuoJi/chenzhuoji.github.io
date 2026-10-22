/**
 * 在中文与西文/数字之间补一个空格，改善中英混排的呼吸感。
 * 只处理文本节点，跳过代码块、行内代码和 KaTeX 公式。
 */
const CJK = '\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff'
const LATIN = 'A-Za-z0-9\\u0370-\\u03ff\\u0400-\\u04ff'
const CJK_TO_LATIN = new RegExp(`([${CJK}])([${LATIN}])`, 'g')
const LATIN_TO_CJK = new RegExp(`([${LATIN}])([${CJK}])`, 'g')

function spaceCjk(text: string): string {
  return text.replace(CJK_TO_LATIN, '$1 $2').replace(LATIN_TO_CJK, '$1 $2')
}

export function addCjkSpacing(root: HTMLElement) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const nodes: Text[] = []
  let current = walker.nextNode()

  while (current) {
    const node = current as Text
    const value = node.nodeValue
    const parent = node.parentElement

    if (value && parent && !parent.closest('code, pre, script, style, .katex, .katex-display')) {
      nodes.push(node)
    }
    current = walker.nextNode()
  }

  for (const node of nodes) {
    const value = node.nodeValue
    if (!value) continue
    const spaced = spaceCjk(value)
    if (spaced !== value) node.nodeValue = spaced
  }
}
