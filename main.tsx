/** @jsx h */
/// <reference no-default-lib="true"/>
/// <reference lib="dom" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { h, renderSSR, serve } from "./deps.ts";

import App from "./App.tsx";
import type { Toc } from "./components/Sidebar.tsx";

export function fetchRepo(pathname: string) {
  // const repo = "denoland/manual";
  const repo = "denocn/deno_docs";
  const branch = "main";
  // const url = `https://raw.githubusercontent.com/${repo}/${branch}${pathname}`;
  const url = `https://cdn.jsdelivr.net/gh/${repo}/${pathname}`;
  return fetch(url);
}

const contentTypes: Record<string, string> = {
  css: "text/css",
  svg: "image/svg+xml",
};

async function handler(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname === "/favicon.ico") {
    const file = await Deno.readFile("public/favicon.ico");
    return new Response(file, {
      headers: {
        "content-type": "image/x-icon",
      },
    });
  }

  if (pathname === "/robots.txt") {
    return new Response("User-agent: *\nAllow: /");
  }

  // FIXME(justjavac): create a home page
  if (pathname === "" || pathname === "/") {
    return Response.redirect(new URL("/introduction", request.url), 302);
  }

  if (pathname.startsWith("/public/")) {
    const file = await Deno.readFile(pathname.substr(1));
    const ext = pathname.substr(pathname.lastIndexOf(".") + 1);
    return new Response(file, {
      headers: {
        "content-type": contentTypes[ext],
      },
    });
  }

  if (pathname.startsWith("/images/")) {
    return fetchRepo(pathname);
  }

  const toc: Toc = await (await fetchRepo("/toc.json")).json();
  const content = await (await fetchRepo(`${pathname}.md`)).text();

  const html = renderSSR(
    <App
      toc={toc}
      content={content}
      github="https://github.com/justjavac/deno_docx"
    />,
  );
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}

console.log("Listening on http://localhost:8000");
serve(handler);
