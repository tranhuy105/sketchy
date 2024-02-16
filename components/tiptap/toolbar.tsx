"use client";

import { type Editor } from "@tiptap/react";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Code,
  Dot,
  Heading,
  ImageIcon,
  Italic,
  Strikethrough,
  Undo,
} from "lucide-react";
import { useCallback } from "react";

type Props = {
  editor: Editor | null;
};

export function Toolbar({ editor }: Props) {
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      if (!editor) return;
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);
  if (!editor) return null;

  return (
    <div className="flex flex-col fixed right-4 top-0 bottom-0 items-center justify-center bg-transparent opacity-50 text-primary">
      <Toggle
        variant={"outline"}
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 1,
            })
            .run()
        }
        className="border-none hover:bg-transparent"
      >
        <Heading className="h-4 w-4" />
      </Toggle>

      <Toggle
        variant={"outline"}
        pressed={editor.isActive("bold")}
        onPressedChange={() =>
          editor.chain().focus().toggleBold().run()
        }
        className="border-none hover:bg-transparent"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        variant={"outline"}
        pressed={editor.isActive("italic")}
        onPressedChange={() =>
          editor.chain().focus().toggleItalic().run()
        }
        className="border-none hover:bg-transparent"
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        variant={"outline"}
        pressed={editor.isActive("strike")}
        onPressedChange={() =>
          editor.chain().focus().toggleStrike().run()
        }
        className="border-none hover:bg-transparent"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Toggle
        className="border-none hover:bg-transparent"
        variant={"outline"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() =>
          editor.chain().focus().toggleBulletList().run()
        }
      >
        <Dot className="h-4 w-4" />
      </Toggle>

      <Toggle
        className="border-none hover:bg-transparent"
        variant={"outline"}
        pressed={editor.isActive("code")}
        onPressedChange={() =>
          editor.chain().focus().toggleCode().run()
        }
      >
        <Code className="h-4 w-4" />
      </Toggle>

      <Toggle
        className="border-none hover:bg-transparent"
        variant={"outline"}
        onClick={() =>
          editor.chain().focus().setTextAlign("left").run()
        }
        pressed={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle
        className="border-none hover:bg-transparent"
        variant={"outline"}
        onClick={() =>
          editor
            .chain()
            .focus()
            .setTextAlign("center")
            .run()
        }
        pressed={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="border-none hover:bg-transparent"
        pressed={false}
        onClick={addImage}
        variant={"outline"}
      >
        <ImageIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        className="border-none hover:bg-transparent"
        variant={"outline"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
