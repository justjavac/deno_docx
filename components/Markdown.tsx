/** @jsx h */
import { h } from "../deps.ts";

interface Props {
  content: string;
}

export default function Markdown({ content }: Props) {
  return (
    <article
      class="markdown-body"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
