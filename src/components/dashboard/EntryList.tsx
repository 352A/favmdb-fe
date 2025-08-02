import { useEffect, useRef } from "react";
import EntriesTable from "@/components/dashboard/EntriesTable";
import { Spinner } from "@/components/ui/spinner";
import type { Entry } from "@/types";

interface Props {
  entries: Entry[];
  onView: (entry: Entry) => void;
  onDelete: (id: number) => void;
  isLoading: boolean;
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}

export default function EntryList({
  entries,
  onView,
  onDelete,
  isLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: Props) {
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

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );

  return (
    <>
      <EntriesTable entries={entries} onView={onView} onDelete={onDelete} />
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
    </>
  );
}
