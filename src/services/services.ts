import type { Entry } from "@/types";
import api from "./api";

// get all entries
export const fetchEntries = async ({ pageParam = null }) => {
  const response = await api.get("/entries", {
    params: { cursor: pageParam },
    withCredentials: true,
  });

  return response.data;
};

// create new entry
export type CreateEntryInput = Omit<
  Entry,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export async function createEntry(entryData: CreateEntryInput) {
  try {
    const res = await api.post("/entries", entryData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to create entry:", error);
    throw new Error("Failed to create entry");
  }
}

// update entry
export type UpdateEntryInput = Partial<CreateEntryInput> & { id: number };

export async function updateEntry({ id, ...entryData }: UpdateEntryInput) {
  try {
    const res = await api.put(`/entries/${id}`, entryData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to update entry:", error);
    throw new Error("Failed to update entry");
  }
}

// delete entry
export async function deleteEntry(id: number) {
  try {
    const res = await api.delete(`/entries/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Failed to delete entry:", error);
    throw new Error("Failed to delete entry");
  }
}
