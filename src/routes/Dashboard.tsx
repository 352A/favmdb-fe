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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const { modal, openModal, closeModal } = useModal<Entry>();

  const [filters, setFilters] = useState({
    title: "",
    director: "",
    minBudget: "",
    maxBudget: "",
    location: "",
    year: "",
    type: "",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const {
    data,
    isLoading,
    deleteEntry,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useEntryQuery(filters);

  const entries = data?.pages.flatMap((page) => page.entries) || [];

  return (
    <section className="mx-4 my-6 lg:mx-16 lg:my-12">
      <UserMenu />

      {/* filters */}
      <h2 className="mt-8 text-2xl font-bold text-white">
        Search & Filter Entries
      </h2>
      <p className="mt-1 text-sm text-zinc-400">
        Narrow down the list by filling in any of the fields below. You can
        search by title, director, year, location, or budget range.
      </p>

      <div className="mt-6">
        <div className="flex justify-end">
          <Button
            variant="link"
            className="mb-1 cursor-pointer p-2 text-sm"
            onClick={() =>
              setFilters({
                title: "",
                director: "",
                minBudget: "",
                maxBudget: "",
                location: "",
                year: "",
                type: "",
              })
            }
          >
            Reset Filters
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <Input
            placeholder="Filter by Title"
            value={filters.title}
            onChange={(e) => handleFilterChange("title", e.target.value)}
          />
          <Select
            value={filters.type}
            onValueChange={(value) => handleFilterChange("type", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Movie">Movie</SelectItem>
              <SelectItem value="TV Show">TV Show</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Filter by Director"
            value={filters.director}
            onChange={(e) => handleFilterChange("director", e.target.value)}
          />
          <Input
            placeholder="Filter by Location"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
          <Input
            type="number"
            placeholder="Filter by Year"
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          />
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="e.g. 1000"
              value={filters.minBudget}
              onChange={(e) => handleFilterChange("minBudget", e.target.value)}
            />
            <Input
              type="number"
              placeholder="e.g. 200000000"
              value={filters.maxBudget}
              onChange={(e) => handleFilterChange("maxBudget", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* create a new entry */}
      <div className="mt-12 flex w-full justify-center">
        <Button
          size="lg"
          className="cursor-pointer bg-linear-to-r from-rose-800 to-violet-900 bg-[length:200%_100%] font-semibold text-white"
          onClick={() => openModal("create", null)}
        >
          Add A New Entry
        </Button>
      </div>
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
