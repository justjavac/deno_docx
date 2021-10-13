/** @jsx h */
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import marked from "https://esm.sh/marked";

import plugin from "../lib/marked_plugin.ts";

marked.use(plugin);

interface Props {
  content: string;
}

export default function Markdown({ content }: Props) {
  const __html = marked.parse(content);
  return (
    <article
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html }}
    />
  );
}
