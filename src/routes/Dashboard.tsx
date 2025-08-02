import UserMenu from "@/components/dashboard/user-menu";
import EntriesTable from "@/components/entries/EntriesTable";
import ViewEntryModal from "@/components/entries/ViewEntryModal";
import { fetchEntries } from "@/services/services";
import type { Entry } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function Dashboard() {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (entry: Entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["entries"],
      queryFn: fetchEntries,
      initialPageParam: null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
    });

  const entries = data?.pages.flatMap((page) => page.entries) || [];

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

  if (isLoading) return <p className="mt-12 text-center">Loading...</p>;

  return (
    <section className="mx-16 my-12">
      <UserMenu />
      <EntriesTable entries={entries} onView={handleView} />
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
