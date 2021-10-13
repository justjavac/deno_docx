/** @jsx h */
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";

interface Props {
  content: string;
}

export default function Markdown({ content }: Props) {
  return (
    <article
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
