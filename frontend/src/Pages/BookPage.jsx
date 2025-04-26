import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import ReviewSection from "../Components.jsx/ReviewSection";
import toast from "react-hot-toast";

const BookPage = () => {
  const { id } = useParams(); // get the book id from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const res = await API.get(`/api/books/${id}`);
      setBook(res.data);
    } catch (error) {
      console.error("Error fetching book:", error);
      toast.error("Failed to load book details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!book) return <div className="p-6 text-center">Book not found.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Book Details */}
      <div className="bg-white p-8 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <h2 className="text-xl text-gray-600">by {book.author}</h2>
        <p className="text-gray-700">{book.description}</p>
      </div>

      {/* Review Section */}
      <ReviewSection bookId={id} />
    </div>
  );
};

export default BookPage;
