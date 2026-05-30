import { useMemo, useState } from "react";
import { parseMTML } from "./util/parser";
import { renderTerminal } from "./util/renderTerminal";
import Preview from "./components/Preview";
import { exportLua } from "./util/exportLua";
import "./App.css";

const starter = `Welcome!

<hr />

<link src="home">Home</link>

<button id="refresh">Refresh</button>

<textbox id="search">Search...</textbox>`;

export default function App() {
  const [content, setContent] =
    useState(starter);

  const lines = useMemo(() => {
    const ast = parseMTML(content);
    return renderTerminal(ast);
  }, [content]);

  function insert(text: string) {
    setContent(
      prev => prev + text
    );
  }

  return (
    <div className="app">
      <div className="editor">
        <div className="toolbar">
          <button
            onClick={() =>
              insert(
                '<color text="red", bg="black"></color>'
              )
            }
          >
            Color
          </button>

          <button
            onClick={() =>
              insert(
                '<link src="example.com"></link>'
              )
            }
          >
            Link
          </button>

          <button
            onClick={() =>
              insert(
                '<textbox id="input"></textbox>'
              )
            }
          >
            Textbox
          </button>

          <button
            onClick={() =>
              insert(
                '<button id="btn"></button>'
              )
            }
          >
            Button
          </button>

          <button
            onClick={() =>
              insert("<hr />")
            }
          >
            HR
          </button>

          <button
            onClick={() =>
              exportLua(content)
            }
          >
            Export Lua
          </button>
        </div>

        <textarea
          value={content}
          onChange={e =>
            setContent(
              e.target.value
            )
          }
        />
      </div>

      <Preview lines={lines} />
    </div>
  );
}