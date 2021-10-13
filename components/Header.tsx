/** @jsx h */
import { h } from "https://esm.sh/preact";

export default function Header() {
  return (
    <header>
      <ul>
        <li>
          <h1>
            <a rel="nav" href="/introduction">
              <img src="/public/logo.svg" alt="Deno 中文文档" /> Deno 中文文档
            </a>
          </h1>
        </li>
        <li className="space"></li>
        <li>
          <a href="https://x.deno.js.cn" target="_blank" rel="friend noopener">
            安装
          </a>
        </li>
        <li>
          <a href="http://deno.js.cn" target="_blank" rel="friend noopener">
            社区
          </a>
        </li>
        <li>
          <a
            href="https://github.com/justjavac/deno_docx"
            target="_blank"
            rel="nofollow noopener"
          >
            <img src="/public/github.svg" width="20" height="20" />
          </a>
        </li>
      </ul>
    </header>
  );
}
