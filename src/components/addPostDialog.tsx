import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { api } from "@/trpc/react";
import { useState } from "react";
import type { Post } from "@/types";
import { DatePicker } from "./datePicker";
import { LoadingSpinner } from "./ui/loading-spinner";

interface AddPostDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAddPost: () => void;
}

export default function AddPostDialog({ open, setOpen, onAddPost }: AddPostDialogProps) {
  const utils = api.useUtils();
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postFormSchema = z.object({
    createdAt: z.date(),
    title: z.string().min(1, "A title is required"),
    message: z.string().min(1, "Update message is required"),
  });

  const postForm = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      createdAt: new Date(),
      title: "",
      message: "",
    },
  });

  const onPostSubmit = (post: Post) => {
    setFormError("");
    setIsSubmitting(true);
    createPost.mutate(post)
  }

  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setOpen(false);
      postForm.reset();
    },
    onError: (error) => {
      console.error("Error from tRPC mutation:", error);
      setIsSubmitting(false);
      setFormError("There was error submitting your update. Please try again.")
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Update
          </DialogTitle>
        </DialogHeader>
        <Form {...postForm}>
          <form onSubmit={postForm.handleSubmit(onPostSubmit)} className="space-y-5">
            <FormField
              control={postForm.control}
              name="createdAt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <DatePicker value={field.value ?? new Date()} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={postForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold" htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input id="title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={postForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel className="font-semibold" htmlFor="message">Your Update</FormLabel>
                  </div>
                  <FormControl>
                    <Textarea {...field} className="overflow-hidden" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {formError && (
              <p className="text-sm font-medium text-destructive">{formError}</p>
            )}
            {!isSubmitting &&
              <Button className="w-full" type="submit">
                Submit
              </Button>
            }
            {isSubmitting &&
              <div className="flex w-full items-center justify-center space-x-2">
                <p>Submitting...</p>
                <LoadingSpinner />
              </div>
            }
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}