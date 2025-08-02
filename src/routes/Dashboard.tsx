import { useState } from "react";
import UserMenu from "@/components/dashboard/user-menu";
import ViewEntryModal from "@/components/dashboard/ViewEntryModal";
import EntryList from "@/components/dashboard/EntryList";
import { useEntryQuery } from "@/hooks/useEntryQuery";
import type { Entry } from "@/types";

export default function Dashboard() {
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isLoading,
    deleteEntry,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEntryQuery();

  const entries = data?.pages.flatMap((page) => page.entries) || [];

  return (
    <section className="mx-16 my-12">
      <UserMenu />
      <EntryList
        entries={entries}
        onView={(entry) => {
          setSelectedEntry(entry);
          setIsModalOpen(true);
        }}
        onDelete={(id) => deleteEntry(id)}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <ViewEntryModal
        entry={selectedEntry}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
