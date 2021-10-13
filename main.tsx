/** @jsx h */
import { h } from "https://esm.sh/preact";
import render from "https://esm.sh/preact-render-to-string";

import App from "./App.tsx";

async function fetchRepo(pathname: string) {
  // const repo = "denoland/manual";
  const repo = "denocn/deno_docs";
  const branch = "main";
  const url = `https://raw.githubusercontent.com/${repo}/${branch}${pathname}`;
  return fetch(url);
}

const contentTypes: Record<string, string> = {
  css: "text/css",
  svg: "image/svg+xml",
  ico: "image/x-icon",
};

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  // FIXME(justjavac): create a home page
  if (pathname === "" || pathname === "/") {
    return Response.redirect("https://docx.deno.dev/introduction", 302);
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

  const toc = await (await fetchRepo("/toc.json")).json();
  const content = await (await fetchRepo(`${pathname}.md`)).text();

  return new Response(
    `<!DOCTYPE html>${render(<App toc={toc} content={content} />)}`,
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
