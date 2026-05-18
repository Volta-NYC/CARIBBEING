// Minimal scraped-markdown renderer. Keeps things compact (no MDX dependency).
import React from "react"

function inline(text: string) {
  // bold + italics + links: keep it simple
  let html = text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, h) => `<a href="${h}">${t}</a>`)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
  return html
}

export function Markdown({ source }: { source: string }) {
  const lines = source.split("\n")
  const blocks: React.ReactNode[] = []
  let para: string[] = []
  let list: string[] | null = null

  const flushPara = () => {
    if (para.length) {
      const text = inline(para.join(" ").trim())
      if (text) blocks.push(<p key={blocks.length} dangerouslySetInnerHTML={{ __html: text }} />)
      para = []
    }
  }
  const flushList = () => {
    if (list && list.length) {
      blocks.push(
        <ul key={blocks.length}>
          {list.map((l, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: inline(l) }} />
          ))}
        </ul>,
      )
      list = null
    }
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) { flushPara(); flushList(); continue }
    if (line.startsWith("###")) { flushPara(); flushList(); blocks.push(<h3 key={blocks.length} dangerouslySetInnerHTML={{ __html: inline(line.replace(/^#+\s*/, "")) }} />); continue }
    if (line.startsWith("##")) { flushPara(); flushList(); blocks.push(<h2 key={blocks.length} dangerouslySetInnerHTML={{ __html: inline(line.replace(/^#+\s*/, "")) }} />); continue }
    if (line.startsWith("# ")) { flushPara(); flushList(); blocks.push(<h2 key={blocks.length} dangerouslySetInnerHTML={{ __html: inline(line.replace(/^#+\s*/, "")) }} />); continue }
    if (/^\*\s*\*\s*\*$/.test(line) || /^\* \* \*$/.test(line)) { flushPara(); flushList(); blocks.push(<hr key={blocks.length} />); continue }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      flushPara()
      list ||= []
      list.push(line.replace(/^[-*]\s+/, ""))
      continue
    }
    flushList()
    para.push(line)
  }
  flushPara()
  flushList()

  return <div className="prose-cari max-w-2xl">{blocks}</div>
}
