import { ReactMemo, useEffect, useRef, useState } from "react";
import Quill from "quill";
//import "quill-emoji/dist/quill-emoji.css"
//import {EmojiBlot, ShortNameEmoji, ToolbarEmoji, TextAreaEmoji} from 'quill-emoji'
import "quill/dist/quill.snow.css";
import "./QuillEditor.css"
const Font = Quill.import("formats/font");

Font.whitelist = [
    "roboto",
    "arial",
    "times",
    "courier",
    "tahoma",
    "verdana",
];

Quill.register(Font, true);

/*
Quill.register(Font, true, {
    'formats/emoji':EmojiBlot,
    'modules/emoji-toolbar':ToolbarEmoji,
    'modules/emoji-textarea':TextAreaEmoji,
    'modules/emoji-shortname':ShortNameEmoji
}, true);
*/

export default({html, setHtml, clearIndex}) => {
    const editorRef = useRef(null);
    const quillRef = useRef(null);

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "link",
        "image",
    ];

    const imageHandler = () => {
        const url = prompt('Enter image URL');
        if (url) {
            const range = editorRef.current.getSelection();
            editorRef.current.insertEmbed(range.index, 'image', url);
        }
    }


    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
            if (html && quillRef.current) {
                quillRef.current.clipboard.dangerouslyPasteHTML(html?html:'')
            } 
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                toolbar: [
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    [{"color":[]}, {"background":[]}],
                    ["image"],
                    [{ font: Font.whitelist}], 
                    [{size:[]}],
                    // [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["clean"],
                ],
                handlers: {
                    image: imageHandler,
                },
                },
            });

            const toolbar = quillRef.current.getModule("toolbar");
            toolbar.addHandler("image", () => {
                const url = window.prompt("Enter image URL");
                if (!url) return;

                const range = quillRef.current.getSelection(true);
                quillRef.current.insertEmbed(range.index, "image", url);
                quillRef.current.setSelection(range.index + 1);
            });

            // Listen for changes
            quillRef.current.setContents([]);
            quillRef.current.clipboard.dangerouslyPasteHTML(html);
            quillRef.current.on("text-change", () => {
                const editorHtml = quillRef.current.root.innerHTML;
                setHtml(editorHtml);
            });
        } 
    }, []);
  
  return (
      <div style={{display:'block'}}  >
          <div ref={editorRef} />
      </div>
  );
}







