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
import { composeBudget, decomposeBudget } from "@/lib/budget";

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
    mutationFn: (data: z.infer<typeof entrySchema> & { id?: number }) => {
      if (type === "create") {
        return createEntry(data);
      } else {
        if (!entry?.id) throw new Error("Entry ID is required for updates");
        return updateEntry({ ...data, id: entry.id });
      }
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
    defaultValues: entry
      ? {
          ...entry,
          ...decomposeBudget(entry.budget ?? 0),
          seasons: entry.seasons || undefined,
          durationHours: entry.durationHours || undefined,
          durationMinutes: entry.durationMinutes || undefined,
        }
      : {
          title: "",
          type: "",
          director: "",
          location: "",
          durationHours: 0,
          durationMinutes: 0,
          seasons: 0,
          year: new Date().getFullYear(),
          details: "",
          budgetAmount: 0,
          budgetUnit: "M",
          budget: 0,
        },
  });

  const watchType = form.watch("type");

  function onSubmit(values: z.infer<typeof entrySchema>) {
    console.log("submitting");
    const { budgetAmount, budgetUnit, ...rest } = values;

    const data = {
      ...rest,
      budgetAmount,
      budgetUnit,
      budget: composeBudget(budgetAmount, budgetUnit),
    };

    mutation.mutate(data);
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
                <Select onValueChange={field.onChange} value={field.value}>
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
        <div className="flex items-end gap-2">
          {/* Amount */}
          <FormField
            control={form.control}
            name="budgetAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="mb-1">Budget</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 4.5"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Unit */}
          <FormField
            control={form.control}
            name="budgetUnit"
            render={({ field }) => (
              <FormItem className="w-24">
                <FormLabel className="mb-1">Unit</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="K">K</SelectItem>
                      <SelectItem value="M">M</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
        {watchType === "Movie" && (
          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="durationHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Hours</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 2"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="durationMinutes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-1">Minutes</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 30"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        {watchType === "TV Show" && (
          <FormField
            control={form.control}
            name="seasons"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-1">Number of Seasons</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. 6 seasons"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
          // disabled={mutation.isPending}
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
