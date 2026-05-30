import type { Cell, Node, Style } from "./types";
import { ccColors } from "./colors";

const WIDTH = 40;

function createCell(style: Style): Cell {
  return {
    char: " ",
    fg: style.fg,
    bg: style.bg,
  };
}

export function renderTerminal(nodes: Node[]) {
  const lines: Cell[][] = [];

  let x = 0;
  let y = 0;

  const ensureLine = () => {
    while (lines.length <= y) {
      lines.push(
        Array.from({ length: WIDTH }, () =>
          createCell({
            fg: ccColors.white,
            bg: ccColors.black,
          })
        )
      );
    }
  };

  function newline() {
    x = 0;
    y++;
    ensureLine();
  }

  function write(text: string, style: Style) {
    ensureLine();

    for (const char of text) {
      if (char === "\n") {
        newline();
        continue;
      }

      if (x >= WIDTH) {
        newline();
      }

      lines[y][x] = {
        char,
        fg: style.fg,
        bg: style.bg,
      };

      x++;
    }
  }

  function walk(nodes: Node[], style: Style) {
    for (const node of nodes) {
      switch (node.type) {
        case "text":
          write(node.content, style);
          break;

        case "hr":
          write("-".repeat(WIDTH), style);
          newline();
          break;

        case "color":
          walk(node.children, {
            fg: node.text
              ? ccColors[node.text]
              : style.fg,
            bg: node.bg
              ? ccColors[node.bg]
              : style.bg,
          });
          break;

        case "link":
          write("» ", {
            fg: ccColors.blue,
            bg: style.bg,
          });

          walk(node.children, {
            fg: ccColors.blue,
            bg: style.bg,
          });
          break;

        case "textbox":
          write("<[ ", {
            fg: ccColors.green,
            bg: style.bg,
          });

          walk(node.children, {
            fg: ccColors.green,
            bg: style.bg,
          });
          break;

        case "button":
          write("▲ ", {
            fg: ccColors.yellow,
            bg: style.bg,
          });

          walk(node.children, {
            fg: ccColors.yellow,
            bg: style.bg,
          });
          break;

        case "nowrap":
          walk(node.children, style);
          break;
      }
    }
  }

  walk(nodes, {
    fg: ccColors.white,
    bg: ccColors.black,
  });

  return lines;
}