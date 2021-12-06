import { hljs, marked } from "../deps.ts";
import type { MarkedExtension } from "../deps.ts";

const headingIdRegex = /(?: +|^)\{#([a-z][\w-]*)\}(?: +|$)/i;

const plugin: MarkedExtension = {
  renderer: {
    heading(text, level) {
      const hasId = text.match(headingIdRegex);
      if (!hasId) {
        return false;
      }
      return `<h${level} id="${hasId[1]}">${
        text.replace(headingIdRegex, "")
      }</h${level}>\n`;
    },
    link(href, title, text) {
      const a = [
        `<a href="${
          isMarkdown(href) ? href?.replace(/\.md$/, "") : href ?? "#"
        }"`,
        isExternal(href) ? `target="_blank"` : "",
        title ? `title="${title}"` : "",
        `rel="friend noopener">`,
        text,
        `</a>`,
      ];
      return a.filter(Boolean).join(" ");
    },
  },
};

marked.use(plugin);

marked.setOptions({
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
});

function isExternal(url: string | null) {
  if (url == null) return false;
  return url.includes("://");
}

function isMarkdown(url: string | null) {
  return !isExternal(url) && url?.endsWith(".md");
}

export default function parseMarkdown(content: string) {
  const matchs = content.match(/#+(.+)/);

  if (matchs == null) {
    return {
      title: "untitled",
      content: marked.parse(content),
      raw: content,
    };
  }

  return {
    title: matchs[1].trim().replace(headingIdRegex, ""),
    content: marked.parse(content),
    raw: content,
  };
}
