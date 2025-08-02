import api from "./api";

export const fetchEntries = async ({ pageParam = null }) => {
  const response = await api.get("/entries", {
    params: { cursor: pageParam },
    withCredentials: true,
  });

  return response.data;
};
