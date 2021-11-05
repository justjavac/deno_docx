/** @jsx h */
import { h } from "https://esm.sh/preact@10";
import render from "https://esm.sh/preact-render-to-string@5";
import type { Toc } from "./components/Sidebar.tsx";

import App from "./App.tsx";

export async function fetchRepo(pathname: string) {
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

async function handleRequest(request: Request) {
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

  return new Response(
    `<!DOCTYPE html>${
      render(
        <App
          toc={toc}
          content={content}
          github="https://github.com/justjavac/deno_docx"
        />,
      )
    }`,
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
