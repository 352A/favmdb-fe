import UserMenu from "@/components/dashboard/user-menu";
import ViewEntryModal from "@/components/dashboard/ViewEntryModal";
import DeleteEntryModal from "@/components/dashboard/DeleteEntryModal";
import EntryList from "@/components/dashboard/EntryList";
import { useEntryQuery } from "@/hooks/useEntryQuery";
import { useModal } from "@/hooks/useModal";
import type { Entry } from "@/types";

export default function Dashboard() {
  const { modal, openModal, closeModal } = useModal<Entry>();

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
        onView={(entry) => openModal("view", entry)}
        onDelete={(entry) => openModal("delete", entry)}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <ViewEntryModal
        entry={modal.type === "view" ? modal.data : null}
        isOpen={modal.type === "view"}
        onClose={closeModal}
      />
      <DeleteEntryModal
        entry={modal.type === "delete" ? modal.data : null}
        isOpen={modal.type === "delete"}
        onClose={closeModal}
        onConfirm={(id) => {
          deleteEntry(id);
          closeModal();
        }}
      />
    </section>
  );
}
