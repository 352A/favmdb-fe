import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchEntries, deleteEntry, createEntry } from "@/services/services";
import { toast } from "sonner";

export function useEntryQuery(filters = {}) {
  const queryClient = useQueryClient();

  const entriesQuery = useInfiniteQuery({
    queryKey: ["entries", filters],
    queryFn: ({ pageParam = null }) => fetchEntries({ pageParam, filters }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
  });

  const createMutation = useMutation({
    mutationFn: createEntry,
    onSuccess: () => {
      toast.success("Entry created!");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: () => {
      toast.error("Could not create the entry.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: () => {
      toast.success("Entry deleted!");
      queryClient.invalidateQueries({ queryKey: ["entries"] });
    },
    onError: () => {
      toast.error("Could not delete the entry.");
    },
  });

  return {
    ...entriesQuery,
    createEntry: createMutation.mutate,
    deleteEntry: deleteMutation.mutate,
  };
}
