import API from "./api";

export const getUserProfile = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

export const updateUserProfile = async (id, userData) => {
  const res = await API.put(`/users/${id}`, userData);
  return res.data;
};
