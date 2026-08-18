"use client";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy, Code2 } from "lucide-react";
import { useState } from "react";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="group relative my-6 overflow-hidden rounded-2xl border border-border/70 bg-zinc-950/90 shadow-xl">
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-zinc-900/60 px-4 py-2.5 text-xs text-zinc-400">
        <div className="flex items-center gap-2 font-mono font-medium">
          <Code2 className="size-3.5 text-sky-400" />
          <span>{language || "Code"}</span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700/60 bg-zinc-800/50 px-2.5 py-1 text-xs text-zinc-300 transition-all hover:bg-zinc-700/80 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-emerald-400" /> Copied!
            </>
          ) : (
            <>
              <Copy className="size-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4 text-xs md:text-sm font-mono leading-relaxed text-zinc-100">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

const components = {
  code: ({ className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || "");
    const isBlock = Boolean(className);
    if (!isBlock) {
      return (
        <code className="rounded-md border border-primary/20 bg-primary/10 px-1.5 py-0.5 font-mono text-xs md:text-sm text-primary font-medium">
          {children}
        </code>
      );
    }
    return (
      <CodeBlock
        code={String(children).replace(/\n$/, "")}
        language={match ? match[1] : "text"}
      />
    );
  },
  h1: ({ children }: any) => (
    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground pt-6 pb-2 border-b border-border/50">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground pt-6 pb-2 border-b border-border/40">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground pt-5 pb-1">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-lg md:text-xl font-semibold tracking-tight text-foreground pt-4">
      {children}
    </h4>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="my-4 rounded-r-2xl border-l-4 border-primary/80 bg-primary/5 px-5 py-3 italic text-foreground/90">
      {children}
    </blockquote>
  ),
  ul: ({ children }: any) => <ul className="my-4 space-y-2.5 pl-2">{children}</ul>,
  ol: ({ children }: any) => <ol className="my-4 space-y-2.5 pl-2">{children}</ol>,
  li: ({ children }: any) => (
    <li className="flex items-start gap-2.5 text-muted-foreground">
      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary/80" />
      <span className="flex-1">{children}</span>
    </li>
  ),
  p: ({ children }: any) => (
    <p className="text-muted-foreground leading-relaxed my-4">{children}</p>
  ),
  table: ({ children }: any) => (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border/60">
      <table className="w-full text-sm">{children}</table>
    </div>
  ),
  th: ({ children }: any) => (
    <th className="border-b border-border/60 bg-muted/30 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border-b border-border/40 px-4 py-2">{children}</td>
  ),
};

export function MarkdownRenderer({
  content,
  className = "",
}: {
  content: string;
  className?: string;
}) {
  if (!content) return null;
  return (
    <div
      className={`space-y-6 text-base md:text-lg leading-relaxed text-foreground/90 ${className}`}
    >
      <ReactMarkdown rehypePlugins={[rehypeSanitize, rehypeHighlight]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
