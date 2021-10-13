/** @jsx h */
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";

import Header from "./components/Header.tsx";
import Sidebar, { Toc } from "./components/Sidebar.tsx";
import Markdown from "./components/Markdown.tsx";

interface Props {
  toc: Toc;
  content: string;
}

export default function App({ toc, content }: Props) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>Hello from JSX</title>
        <link
          rel="shortcut icon"
          href="/public/favicon.ico"
          type="image/x-icon"
        />
        <link rel="stylesheet" href="/public/style.css" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/github-markdown-css@4.0.0/github-markdown.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/styles/github.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release/build/highlight.min.js"
        >
        </script>
        <script>hljs.highlightAll();</script>
      </head>
      <body>
        <Header />
        <section>
          <Sidebar toc={toc} />
          <Markdown content={content} />
        </section>
      </body>
    </html>
  );
}
