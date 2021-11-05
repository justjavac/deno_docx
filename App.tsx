/** @jsx h */
import { h } from "https://esm.sh/preact@10";

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
        <link rel="stylesheet" href="/public/style.css" />
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
