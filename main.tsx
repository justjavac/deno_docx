/** @jsx h */
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

import App from "./App.tsx";

async function fetchRepo(pathname: string) {
  // const repo = "denoland/manual";
  const repo = "denocn/deno_docs";
  const branch = "main";
  const url = `https://raw.githubusercontent.com/${repo}/${branch}${pathname}`;
  return fetch(url);
}

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/favicon.ico")) {
    const favicon = new URL("favicon.ico", import.meta.url);
    return fetch(favicon);
  }

  if (pathname.startsWith("/public/style.css")) {
    const style = new URL("public/style.css", import.meta.url);
    const response = await fetch(style);
    const headers = new Headers(response.headers);
    headers.set("content-type", "text/css; charset=utf-8");
    return new Response(response.body, { ...response, headers });
  }

  if (pathname.startsWith("/public/")) {
    const assets = new URL(pathname.substr(1), import.meta.url);
    return fetch(assets);
  }

  if (pathname.startsWith("/images/")) {
    return fetchRepo(pathname);
  }

  const toc = await (await fetchRepo("/toc.json")).json();
  const content = await (await fetchRepo(`${pathname}.md`)).text();

  return new Response(
    `<!DOCTYPE html>${renderToString(<App toc={toc} content={content} />)}`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
