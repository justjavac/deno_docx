/** @jsx h */
import { h } from "https://esm.sh/preact@10";

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
