"use client";

import React, { useState } from "react";
import { Check, Copy, Code2, Terminal, FileCode2 } from "lucide-react";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeBlockProps {
  code: string;
  language: string;
}

function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageLabel = (lang: string) => {
    const clean = lang.trim().toLowerCase();
    switch (clean) {
      case "ts":
      case "typescript":
        return "TypeScript";
      case "js":
      case "javascript":
        return "JavaScript";
      case "json":
        return "JSON";
      case "bash":
      case "sh":
      case "shell":
        return "Terminal";
      case "html":
        return "HTML";
      case "css":
        return "CSS";
      case "md":
      case "markdown":
        return "Markdown";
      default:
        return clean.toUpperCase() || "Code";
    }
  };

  const getLanguageIcon = (lang: string) => {
    const clean = lang.trim().toLowerCase();
    if (clean === "bash" || clean === "sh" || clean === "shell") {
      return <Terminal className="size-3.5 text-emerald-400" />;
    }
    if (clean === "json") {
      return <FileCode2 className="size-3.5 text-amber-400" />;
    }
    return <Code2 className="size-3.5 text-sky-400" />;
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-border/70 bg-zinc-950/90 shadow-xl backdrop-blur-md">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-xs text-zinc-400">
        <div className="flex items-center gap-2 font-mono font-medium">
          {getLanguageIcon(language)}
          <span>{getLanguageLabel(language)}</span>
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700/60 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-300 transition-all hover:bg-zinc-700/80 hover:text-white active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5 text-zinc-400 group-hover:text-zinc-200" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Body */}
      <div className="overflow-x-auto p-4 text-xs md:text-sm font-mono leading-relaxed text-zinc-100 selection:bg-primary/30 selection:text-white">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  if (!content) return null;

  // Helper to render inline elements (bold, italic, inline code)
  const renderInline = (text: string) => {
    // Process inline code first: `code`
    const parts = text.split(/(`[^`]+`)/g);

    return parts.map((part, idx) => {
      if (part.startsWith("`") && part.endsWith("`") && part.length > 1) {
        const codeContent = part.slice(1, -1);
        return (
          <code
            key={idx}
            className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-xs md:text-sm text-primary font-medium"
          >
            {codeContent}
          </code>
        );
      }

      // Process bold: **text**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith("**") && bPart.endsWith("**") && bPart.length > 3) {
          return (
            <strong key={bIdx} className="font-bold text-foreground">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        return bPart;
      });
    });
  };

  // Parse code blocks vs markdown paragraphs
  const blocks: { type: "code" | "markdown"; content: string; language?: string }[] = [];
  const codeBlockRegex = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g;

  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      const textBefore = content.substring(lastIndex, match.index);
      if (textBefore.trim()) {
        blocks.push({ type: "markdown", content: textBefore });
      }
    }
    blocks.push({
      type: "code",
      language: match[1] || "text",
      content: match[2].trimEnd(),
    });
    lastIndex = codeBlockRegex.lastIndex;
  }

  if (lastIndex < content.length) {
    const textRemaining = content.substring(lastIndex);
    if (textRemaining.trim()) {
      blocks.push({ type: "markdown", content: textRemaining });
    }
  }

  return (
    <div
      className={`space-y-6 text-base md:text-lg leading-relaxed text-foreground/90 ${className}`}
    >
      {blocks.map((block, bIdx) => {
        if (block.type === "code") {
          return <CodeBlock key={bIdx} code={block.content} language={block.language || "text"} />;
        }

        // Process markdown text paragraphs
        const paragraphs = block.content.split(/\n\n+/);

        return (
          <React.Fragment key={bIdx}>
            {paragraphs.map((para, pIdx) => {
              const trimmed = para.trim();
              if (!trimmed) return null;

              // Headings
              if (trimmed.startsWith("# ")) {
                return (
                  <h1
                    key={pIdx}
                    className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground pt-6 pb-2 border-b border-border/50"
                  >
                    {renderInline(trimmed.replace(/^#\s+/, ""))}
                  </h1>
                );
              }
              if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={pIdx}
                    className="text-2xl md:text-3xl font-bold tracking-tight text-foreground pt-6 pb-2 border-b border-border/40"
                  >
                    {renderInline(trimmed.replace(/^##\s+/, ""))}
                  </h2>
                );
              }
              if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={pIdx}
                    className="text-xl md:text-2xl font-bold tracking-tight text-foreground pt-5 pb-1"
                  >
                    {renderInline(trimmed.replace(/^###\s+/, ""))}
                  </h3>
                );
              }
              if (trimmed.startsWith("#### ")) {
                return (
                  <h4
                    key={pIdx}
                    className="text-lg md:text-xl font-semibold tracking-tight text-foreground pt-4"
                  >
                    {renderInline(trimmed.replace(/^####\s+/, ""))}
                  </h4>
                );
              }

              // Blockquotes
              if (trimmed.startsWith("> ")) {
                const quoteText = trimmed
                  .split("\n")
                  .map((l) => l.replace(/^>\s*/, ""))
                  .join("\n");
                return (
                  <blockquote
                    key={pIdx}
                    className="my-4 rounded-r-2xl border-l-4 border-primary/80 bg-primary/5 px-5 py-3 italic text-foreground/90"
                  >
                    {renderInline(quoteText)}
                  </blockquote>
                );
              }

              // Unordered lists
              if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                const items = trimmed
                  .split("\n")
                  .filter((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "));
                return (
                  <ul key={pIdx} className="my-4 space-y-2.5 pl-2">
                    {items.map((item, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2.5 text-muted-foreground">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/80" />
                        <span className="flex-1">{renderInline(item.replace(/^[-*]\s+/, ""))}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              // Ordered lists
              if (/^\d+\.\s+/.test(trimmed)) {
                const items = trimmed.split("\n").filter((l) => /^\d+\.\s+/.test(l.trim()));
                return (
                  <ol key={pIdx} className="my-4 space-y-2.5 pl-2">
                    {items.map((item, iIdx) => {
                      const numMatch = item.trim().match(/^(\d+)\.\s+(.*)/);
                      const num = numMatch ? numMatch[1] : `${iIdx + 1}`;
                      const text = numMatch ? numMatch[2] : item;
                      return (
                        <li key={iIdx} className="flex items-start gap-3 text-muted-foreground">
                          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-xs font-bold text-primary">
                            {num}
                          </span>
                          <span className="flex-1 pt-0.5">{renderInline(text)}</span>
                        </li>
                      );
                    })}
                  </ol>
                );
              }

              // Normal paragraph
              return (
                <p key={pIdx} className="text-muted-foreground leading-relaxed">
                  {renderInline(trimmed)}
                </p>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
