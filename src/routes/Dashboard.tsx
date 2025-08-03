import UserMenu from "@/components/dashboard/user-menu";
import ViewEntryModal from "@/components/dashboard/modals/ViewEntryModal";
import DeleteEntryModal from "@/components/dashboard/modals/DeleteEntryModal";
import EntryList from "@/components/dashboard/EntryList";
import { useEntryQuery } from "@/hooks/useEntryQuery";
import { useModal } from "@/hooks/useModal";
import type { Entry } from "@/types";
import { Button } from "@/components/ui/button";
import CreateEntryModal from "@/components/dashboard/modals/CreateEntryModal";
import UpdateEntryModal from "@/components/dashboard/modals/UpdateEntryModal";

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

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <input
          name="title"
          placeholder="Filter by Title"
          // onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
        <select
          name="type"
          // onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        >
          <option value="">All Types</option>
          <option value="Film">Film</option>
          <option value="Series">Series</option>
          <option value="Documentary">Documentary</option>
        </select>
        <input
          name="year"
          type="number"
          placeholder="Year"
          // onChange={handleFilterChange}
          className="rounded border px-3 py-2"
        />
      </div>

      {/* create a new entry */}
      <Button
        size="lg"
        className="cursor-pointer bg-linear-to-r from-rose-800 to-violet-900 bg-[length:200%_100%] font-semibold text-white"
        onClick={() => openModal("create", null)}
      >
        Add New Entry
      </Button>
      {/* List of entries */}
      <EntryList
        entries={entries}
        onView={(entry) => openModal("view", entry)}
        onEdit={(entry) => openModal("edit", entry)}
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
      <CreateEntryModal isOpen={modal.type === "create"} onClose={closeModal} />
      <UpdateEntryModal
        entry={modal.type === "edit" ? modal.data : null}
        isOpen={modal.type === "edit"}
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
