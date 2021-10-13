/** @jsx h */
import { h } from "https://esm.sh/preact";

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
