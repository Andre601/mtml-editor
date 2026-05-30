export interface Cell {
  char: string;
  fg: string;
  bg: string;
}

export interface Style {
  fg: string;
  bg: string;
}

export type Node =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "color";
      text?: string;
      bg?: string;
      children: Node[];
    }
  | {
      type: "link";
      src: string;
      children: Node[];
    }
  | {
      type: "textbox";
      id: string;
      children: Node[];
    }
  | {
      type: "button";
      id: string;
      children: Node[];
    }
  | {
      type: "nowrap";
      children: Node[];
    }
  | {
      type: "hr";
    };