import { useState } from "react";

const ReviewForm = ({ onSubmit, initialText = "", loading = false }) => {
  const [text, setText] = useState(initialText);
  const [rating, setRating] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ text, rating });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        required
        className="w-full border border-gray-300 p-2 rounded"
      />
      <div>
        <label className="block mb-1 text-[#36454F]">Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-1 rounded">
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-[#36454F] text-white px-4 py-2 rounded hover:opacity-90"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
