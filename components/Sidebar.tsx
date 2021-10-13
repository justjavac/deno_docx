/** @jsx h */
import { Fragment, h } from "https://x.lcas.dev/preact@10.5.12/mod.js";

export interface Toc {
  [key: string]: {
    name: string;
    children?: { [key: string]: string };
  };
}

export interface SidebarProps {
  toc: Toc;
}

export default function Sidebar({ toc }: SidebarProps) {
  return (
    <aside>
      <nav>
        <ul>
          {Object.entries(toc).map(([path, { name, children = {} }]) => {
            return (
              <Fragment key={path}>
                <li>
                  <a rel="nav" href={`/${path}`}>
                    {name}
                  </a>
                </li>
                {Object.entries(children).map((
                  [subPath, subName],
                ) => (
                  <li className="indent" key={`${path}-${subPath}`}>
                    <a rel="nav" href={`/${path}/${subPath}`}>
                      {subName}
                    </a>
                  </li>
                ))}
              </Fragment>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
