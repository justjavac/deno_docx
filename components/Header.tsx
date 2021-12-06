/** @jsx h */
import { h } from "../deps.ts";

// FIXME(justjavac): nano_jsx 渲染 svg 的时候有 bug，所以临时使用 inline html
const svg_github = `<svg
  class="github-icon"
  width="20px"
  height="20px"
  viewBox="0 0 16 16"
  >
  <path
    fill="#777777"
    d="M8,0.7C3.9,0.7,0.5,4,0.5,8.2c0,3.3,2.1,6.1,5.1,7.1c0.4,0.1,0.5-0.2,0.5-0.4c0-0.2,0-0.8,0-1.4c-1.9,0.3-2.4-0.5-2.5-0.9 c-0.1-0.2-0.5-0.9-0.8-1.1c-0.3-0.1-0.6-0.5,0-0.5c0.6,0,1,0.5,1.2,0.8c0.7,1.1,1.8,0.8,2.2,0.6c0.1-0.5,0.3-0.8,0.5-1 C5,11.3,3.2,10.7,3.2,7.8c0-0.8,0.3-1.5,0.8-2c-0.1-0.2-0.3-1,0.1-2c0,0,0.6-0.2,2.1,0.8C6.7,4.4,7.4,4.3,8,4.3 c0.6,0,1.3,0.1,1.9,0.3c1.4-1,2.1-0.8,2.1-0.8c0.4,1,0.1,1.8,0.1,2c0.5,0.5,0.8,1.2,0.8,2c0,2.9-1.8,3.5-3.4,3.7 c0.3,0.2,0.5,0.7,0.5,1.4c0,1,0,1.8,0,2.1c0,0.2,0.1,0.4,0.5,0.4c3.1-1,5.1-3.9,5.1-7.1C15.5,4,12.1,0.7,8,0.7z"
  />
</svg>`;

export default function Header({ github }: { github: string }) {
  return (
    <header>
      <ul>
        <li>
          <h1>
            <a rel="nav" href="/introduction" aria-label="Deno logo">
              <img
                src="https://cdn.deno.js.cn/uploads/default/original/1X/e0c97847fef7fad64d7d129d090f5cc5b862f76c.svg"
                class="logo"
                alt="Deno 中文文档"
              />
              Deno 中文文档
            </a>
          </h1>
        </li>
        <li class="space"></li>
        <li>
          <a
            href="https://x.deno.js.cn"
            target="_blank"
            rel="friend noopener noreferrer"
          >
            安装
          </a>
        </li>
        <li>
          <a
            href="http://deno.js.cn"
            target="_blank"
            rel="friend noopener noreferrer"
          >
            社区
          </a>
        </li>
        <li>
          <a
            href={github}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="GitHub Repo"
            dangerouslySetInnerHTML={{ __html: svg_github }}
          />
        </li>
      </ul>
    </header>
  );
}
