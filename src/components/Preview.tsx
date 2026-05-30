import type { Cell } from "../util/types";

interface Props {
    lines: Cell[][];
}

export default function Preview({
    lines,
}: Props) {
    return (
        <div className="preview">
            {lines.map((line, y) => (
                <div key={y} className="line">
                    {line.map((cell, x) => (
                        <span key={x} className="cell" style={{
                            color: cell.fg,
                            backgroundColor: cell.bg,
                        }}>
                            {cell.char}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
}