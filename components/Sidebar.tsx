/** @jsx h */
import { Fragment, h } from "../deps.ts";

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
                  <a rel="nav preload" href={`/${path}`}>
                    {name}
                  </a>
                </li>
                {Object.entries(children).map((
                  [subPath, subName],
                ) => (
                  <li className="indent" key={`${path}-${subPath}`}>
                    <a rel="nav preload" href={`/${path}/${subPath}`}>
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
