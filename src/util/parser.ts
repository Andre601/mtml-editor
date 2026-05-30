import type { Node } from "./types";

export function parseMTML(input: string): Node[] {
  input = input.replace(/<![\s\S]*?>/g, "");

  const root: Node[] = [];

  function parseContent(content: string): Node[] {
    const nodes: Node[] = [];

    const regex =
      /<(color|link|textbox|button|nowrap)([^>]*)>([\s\S]*?)<\/\1>|<hr\s*\/>/gi;

    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content))) {
      if (match.index > lastIndex) {
        nodes.push({
          type: "text",
          content: content.slice(lastIndex, match.index),
        });
      }

      if (match[0].startsWith("<hr")) {
        nodes.push({ type: "hr" });
      } else {
        const tag = match[1];
        const attrs = match[2];
        const inner = match[3];

        const getAttr = (name: string) => {
          const m = attrs.match(
            new RegExp(`${name}="([^"]*)"`)
          );
          return m?.[1];
        };

        const children = parseContent(inner);

        switch (tag) {
          case "color":
            nodes.push({
              type: "color",
              text: getAttr("text"),
              bg: getAttr("bg"),
              children,
            });
            break;

          case "link":
            nodes.push({
              type: "link",
              src: getAttr("src") ?? "",
              children,
            });
            break;

          case "textbox":
            nodes.push({
              type: "textbox",
              id: getAttr("id") ?? "",
              children,
            });
            break;

          case "button":
            nodes.push({
              type: "button",
              id: getAttr("id") ?? "",
              children,
            });
            break;

          case "nowrap":
            nodes.push({
              type: "nowrap",
              children,
            });
            break;
        }
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < content.length) {
      nodes.push({
        type: "text",
        content: content.slice(lastIndex),
      });
    }

    return nodes;
  }

  root.push(...parseContent(input));

  return root;
}