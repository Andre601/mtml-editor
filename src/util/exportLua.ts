export function exportLua(content: string) {
    const blob = new Blob([content], {
        type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "page.lua";
    a.click();

    URL.revokeObjectURL(url);
}