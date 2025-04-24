import API from "./api";

export const postReview = async (reviewData) => {
  const res = await API.post("/reviews", reviewData);
  return res.data;
};
