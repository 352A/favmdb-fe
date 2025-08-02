import { useEffect, useRef, useState } from "react";
import UserMenu from "@/components/dashboard/user-menu";
import EntriesTable from "@/components/entries/EntriesTable";
import ViewEntryModal from "@/components/entries/ViewEntryModal";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchEntries } from "@/services/services";
import { deleteEntry } from "@/services/services";
import { toast } from "sonner";
import type { Entry } from "@/types";
import { Spinner } from "@/components/ui/spinner";

export default function Dashboard() {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  // fetch all entries
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["entries"],
      queryFn: fetchEntries,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    });

  // delete entry
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

  // flatten entries
  const entries = data?.pages.flatMap((page) => page.entries) || [];

  // handle view entry modal
  const handleView = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  // Intersection Observer for infinite scroll
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // set loading state
  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <section className="mx-16 my-12">
      <UserMenu />
      <EntriesTable
        entries={entries}
        onView={handleView}
        onDelete={(id) => deleteMutation.mutate(id)}
      />
      <ViewEntryModal
        entry={selectedEntry}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {hasNextPage ? (
        <div
          ref={observerRef}
          className="mt-4 flex h-10 items-center justify-center"
        >
          <p className="text-sm text-gray-500">
            {isFetchingNextPage
              ? "Loading more..."
              : "Scroll down to load more"}
          </p>
        </div>
      ) : (
        <div className="mt-4 flex h-10 items-center justify-center">
          <p className="text-sm text-gray-500">
            No more entries. If you keep scrolling, you'll just get stronger
            thumbs.
          </p>
        </div>
      )}
    </section>
  );
}
