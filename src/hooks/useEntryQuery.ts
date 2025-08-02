import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchEntries, deleteEntry } from "@/services/services";
import { toast } from "sonner";

export function useEntryQuery() {
  const queryClient = useQueryClient();

  const entriesQuery = useInfiniteQuery({
    queryKey: ["entries"],
    queryFn: fetchEntries,
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
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

  return { ...entriesQuery, deleteEntry: deleteMutation.mutate };
}
