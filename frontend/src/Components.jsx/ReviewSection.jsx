import { useEffect, useState, useContext } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import API from "../api"; // adjust the path as per your folder structure

const ReviewSection = ({ bookId }) => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/reviews/${bookId}`);
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText || rating === 0) {
      toast.error("Please write a review and select a rating.");
      return;
    }

    try {
      setLoading(true);
      await API.post(`/api/reviews/${bookId}`, {
        text: reviewText,
        rating:rating,
        // userName: user?.name || "Anonymous",
      });
      setReviewText("");
      setRating(0);
      toast.success("Review submitted!");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border rounded-md"
              rows="4"
              placeholder="Write your review here..."
            />
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Please login to write a review.</p>
        )}
      </div>

      {/* Reviews List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div key={r.id} className="border p-4 rounded-md space-y-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${i < r.rating ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-800">{r.review}</p>
                <p className="text-gray-500 text-sm">- {r.userName}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
