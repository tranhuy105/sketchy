"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

import { Toolbar } from "./toolbar";
import Image from "@tiptap/extension-image";

const Tiptap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: any;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "text-2xl font-bold py-2",
            levels: [1, 2],
          },
        },
        history: {
          depth: 20,
          newGroupDelay: 1000,
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-4",
          },
          itemTypeName: "listItem",
          keepMarks: true,
          keepAttributes: true,
        },
        code: {
          HTMLAttributes: {
            class:
              "bg-black text-white w-fit rounded-md p-1 mx-1",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image.configure({
        HTMLAttributes: {
          class:
            "max-w-[calc(100vh*4/5)] max-h-[360px] mx-auto object-cover",
        },
      }),
      Color,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class:
            "px-2 py-1 rounded-md font-semibold text-slate-50",
        },
      }),
    ],

    editorProps: {
      attributes: {
        class:
          "min-h-[500px] rounded-md caret-pink-700 font-medium focus:border focus:border-primary/20 focus:outline-none pr-4 py-3 text-base border-none space-y-2 mt-16",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    content,
  });

  return (
    <div className="justify-between flex items-center w-full relative ">
      <div className="w-full">
        <EditorContent editor={editor} />
      </div>
      <Toolbar editor={editor} />
    </div>
  );
};

export default Tiptap;
