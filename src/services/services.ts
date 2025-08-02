import api from "./api";

// get all entries
export const fetchEntries = async ({ pageParam = null }) => {
  const response = await api.get("/entries", {
    params: { cursor: pageParam },
    withCredentials: true,
  });

  return response.data;
};

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
