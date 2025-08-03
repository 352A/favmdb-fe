import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { entrySchema } from "@/validators/entrySchema";

import { z } from "zod";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry, updateEntry } from "@/services/services";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Entry } from "@/types";

export default function EntryForm({
  entry,
  type,
  onClose,
}: {
  entry?: Entry | null;
  type: "create" | "update";
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:
      type === "create"
        ? createEntry
        : (data: z.infer<typeof entrySchema>) => {
            if (!entry?.id) throw new Error("Entry ID is required for updates");
            return updateEntry({ ...data, id: entry.id });
          },
    onSuccess: () => {
      toast.success(
        `Entry ${type === "create" ? "created" : "updated"} successfully`,
      );
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      onClose();
    },
    onError: () => {
      toast.error(`Failed to ${type} entry`);
    },
  });

  const form = useForm<z.infer<typeof entrySchema>>({
    resolver: zodResolver(entrySchema),
    defaultValues: entry || {
      title: "",
      type: "",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: new Date().getFullYear(),
      details: "",
    },
  });

  function onSubmit(values: z.infer<typeof entrySchema>) {
    if (type === "update" && !entry?.id) {
      toast.error("Cannot update entry without an ID");
      return;
    }
    mutation.mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-8 space-y-6 *:mx-2"
      >
        {/* title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Title</FormLabel>
              <FormControl>
                <Input placeholder="Inception" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* type */}

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Movie">Movie</SelectItem>
                    <SelectItem value="TV Show">TV Show</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* director */}
        <FormField
          control={form.control}
          name="director"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Director</FormLabel>
              <FormControl>
                <Input placeholder="Christopher Nolan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* budget */}
        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Budget</FormLabel>
              <FormControl>
                <Input type="string" placeholder="e.g. 4.5M" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Location</FormLabel>
              <FormControl>
                <Input placeholder="Los Angeles" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* duration */}
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Duration</FormLabel>
              <FormControl>
                <Input placeholder="2h 30m" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* year */}
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Year</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g. 2025"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* details */}
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="mb-1">Details</FormLabel>
              <FormControl>
                <Input placeholder="Optional details..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="cursor-pointer"
        >
          {mutation.isPending
            ? "Submitting..."
            : type === "create"
              ? "Create"
              : "Update"}
        </Button>
      </form>
    </Form>
  );
}
