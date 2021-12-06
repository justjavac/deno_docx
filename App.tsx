/** @jsx h */
import { h } from "./deps.ts";

import Header from "./components/Header.tsx";
import Sidebar, { Toc } from "./components/Sidebar.tsx";
import Markdown from "./components/Markdown.tsx";
import parseMarkdown from "./lib/parse_markdown.ts";

interface Props {
  toc: Toc;
  content: string;
  github: string;
}

export default function App({ toc, content, github }: Props) {
  const page = parseMarkdown(content);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{page.title}</title>
        <meta name="keyword" content="deno, doc, docs, manual, 文档, 手册" />
        <meta
          name="description"
          content="Deno 是一个 JavaScript/TypeScript 的运行时，默认使用安全环境执行代码，有着卓越的开发体验。Deno 建立在 V8、Rust 和 Tokio 的基础上。"
        />
        <link rel="stylesheet" href="/public/style.css" />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-light.min.css"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="preload"
          href="https://cdn.jsdelivr.net/npm/highlightjs/styles/github.min.css"
          as="style"
          onload="this.onload=null;this.rel='stylesheet'"
        />
      </head>
      <body>
        <Header github={github} />
        <section>
          <Sidebar toc={toc} />
          <Markdown content={page.content} />
        </section>
      </body>
    </html>
  );
}
