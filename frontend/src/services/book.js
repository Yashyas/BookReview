import API from "./api";

export const getAllBooks = async () => {
  const res = await API.get("/books");
  return res.data;
};

export const getBookById = async (id) => {
  const res = await API.get(`/books/${id}`);
  return res.data;
};
