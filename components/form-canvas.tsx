"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { CanvasBoard } from "./drawing-tablet/canvas";
import { saveOrCreateNewBoard } from "@/actions/saveOrCreateNewBoard";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { DeleteButton } from "./delete-button";

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
}

export const FormCanvasComponents = ({
  title,
  content,
  boardId: id,
}: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
      content,
    },
  });

  async function onSubmit(
    values: z.infer<typeof formSchema>
  ) {
    setIsLoading(true);
    await saveOrCreateNewBoard(
      values.title,
      "SKETCH",
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
          "space-y-6 w-full px-12 py-6 h-full overflow-y-auto",
          isLoading && "cursor-progress"
        )}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="text-4xl font-extrabold focus-visible:border-0 focus-visible:ring-0 focus:ring-offset-0 placeholder:font-normal px-1 py-7 border-none focus:ring-0 focus:outline-none"
                  placeholder="Type here.."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This will be displayed as the title of your
                canvas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CanvasBoard
                  content={content !== "" ? content : null}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full">
          <Button
            type="submit"
            variant={"ghost"}
            className="w-full"
            size={"lg"}
            disabled={isLoading}
          >
            Save
          </Button>
          <DeleteButton id={id} title={title} />
        </div>
      </form>
    </Form>
  );
};
