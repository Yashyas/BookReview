import { useEffect, useState, useContext } from "react";
import { useAuth } from "../Context/AuthContext";
import toast from "react-hot-toast";
import API from "../api"; // adjust the path as per your folder structure
import Beautify from "./Beautify";

const ReviewSection = ({ bookId }) => {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showBeautifyModal, setShowBeautifyModal] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [bookId]);

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/api/reviews?bookId=${bookId}`);
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
      await API.post(`/api/reviews/`, {
        bookId: bookId,
        text: reviewText,
        rating: rating,
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

        {/* Review form text area */}

        {user ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full p-3 border rounded-md"
              rows="4"
              placeholder="Write your review here..."
            />
            {/* Beutified text response */}
      <Beautify
          isOpen={showBeautifyModal}
          onClose={() => setShowBeautifyModal(false)}
          originalText={reviewText}
          onSubmit={async (beautified) => {
            try {
              setLoading(true);
              await API.post(`/api/reviews`, {
                bookId:bookId,
                text: beautified,
                rating:rating,
              });
              toast.success("Beautified review submitted!");
              setReviewText("");
              setRating(0);
              fetchReviews();
            } catch (err) {
              console.error(err);
              toast.error("Failed to submit.");
            } finally {
              setShowBeautifyModal(false);
              setLoading(false);
            }
          }}
        />
            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className={`text-2xl ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="button"
              className="bg-green-600 text-white px-6 py-2 m-2 rounded-md hover:bg-green-700"
              disabled={!reviewText || rating === 0}
              onClick={() => setShowBeautifyModal(true)}
            >
              Beautify with AI
            </button>

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
              <div key={r._id} className="border p-4 rounded-md space-y-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < r.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-800">{r.text}</p>
                <p className="text-gray-500 text-sm">- {r.userId.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
