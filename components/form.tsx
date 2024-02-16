"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Tiptap from "./tiptap/tiptap";
import { SaveButton } from "./save-button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { saveOrCreateNewBoard } from "@/actions/saveOrCreateNewBoard";
import { DeleteButton } from "./delete-button";
import Image from "next/image";
import { AddImageButton } from "./add-image-button";

const formSchema = z.object({
  title: z
    .string()
    .min(5, {
      message:
        "Title too short, must be longer than 5 characters",
    })
    .max(
      25,
      "Title too long, must be shorter than 25 characters"
    ),
  content: z.string(),
});

interface FormProps {
  title: string;
  content: string;
  boardId?: string;
  image: string | null;
}

export const FormComponents = ({
  title,
  content,
  boardId: id,
  image,
}: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      content,
    },
  });

  const isPlaceHolderImage = image?.includes("placeholder");

  async function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    // console.log(values.content);
    setIsLoading(true);
    await saveOrCreateNewBoard(
      values.title,
      "NOTE",
      values.content,
      id
    );
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "space-y-8 w-full px-12 py-8 pt-12 h-full overflow-y-auto relative ",
          isLoading && "cursor-progress"
        )}
      >
        <FormField
          control={form.control}
          disabled={isLoading}
          name="title"
          render={({ field }) => (
            <FormItem className="drop-shadow-xl">
              <FormLabel className="text-xl">
                Title
              </FormLabel>
              <FormControl>
                <Input
                  className="text-5xl font-extrabold focus-visible:border-non focus:outline-none focus-visible:ring-0 focus:ring-offset-0 placeholder:font-normal px-1 py-7 border-none focus:ring-0 bg-transparent"
                  placeholder="Type here.."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be displayed as the title of your
                note
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          disabled={isLoading}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Tiptap
                  content={field.name && content}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full space-y-2">
          <SaveButton isLoading={isLoading} />
          <DeleteButton title={title} id={id} />
        </div>
        <AddImageButton boardId={id} />
        {!isPlaceHolderImage && image && (
          <div className="absolute -top-8 -z-10 bg-transparent w-full left-0 right-0 h-[260px]">
            <div className="w-[100%] h-[100%] opacity-50 relative">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
              />
              <div className="absolute w-full h-full top-0 bottom-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-10" />
            </div>
          </div>
        )}
      </form>
    </Form>
  );
};
