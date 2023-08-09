import { MouseEvent } from "react";

export const editorClickOutside = (e: MouseEvent<HTMLDivElement>, editor: HTMLDivElement) => {
    if (e.target !== e.currentTarget) return;

    editor.focus();

    if (document.createRange) {
        const range = document.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        var sel = window.getSelection() || undefined;
        sel?.removeAllRanges();
        sel?.addRange(range);
    }


}