/** @jsx h */
import { h } from "https://esm.sh/preact";

import Header from "./components/Header.tsx";
import Sidebar, { Toc } from "./components/Sidebar.tsx";
import Markdown from "./components/Markdown.tsx";
import parseMarkdown from "./lib/parse_markdown.ts";

interface Props {
  toc: Toc;
  content: string;
}

export default function App({ toc, content }: Props) {
  const page = parseMarkdown(content);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{page.title}</title>
        <link
          rel="shortcut icon"
          href="/public/favicon.ico"
          type="image/x-icon"
        />
        <link rel="stylesheet" href="/public/style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/github-markdown-css/github-markdown-light.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/highlightjs/styles/github.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/highlightjs/highlight.pack.min.js">
        </script>
        <script src="https://cdn.jsdelivr.net/npm/anchor-js/anchor.min.js">
        </script>
        <script>hljs.highlightAll();anchors.add();</script>
      </head>
      <body>
        <Header />
        <section>
          <Sidebar toc={toc} />
          <Markdown content={page.content} />
        </section>
      </body>
    </html>
  );
}
