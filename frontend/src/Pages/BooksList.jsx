import { useState, useEffect } from 'react';
import API from '../api'; // axios api.js
import { Link } from 'react-router-dom';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await API.get(`/api/books?page=${page}`);
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages || 1); // adjust based on your backend
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-8">Explore Books 📚</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Book List */}
        {loading ? (
          <div className="flex justify-center text-gray-600 text-lg">Loading books...</div>
        ) : (
          <>
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredBooks.map((book) => (
                  <div key={book._id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <img
                      src={book.coverImage || 'https://via.placeholder.com/400x600?text=No+Image'}
                      alt={book.title}
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-700">{book.title}</h3>
                    <p className="text-gray-500 mb-2">by {book.author}</p>
                    <Link
                      to={`/books/${book._id}`}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold"
                    >
                      View Details →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 text-lg">No books found matching your search!</div>
            )}
          </>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-12 space-x-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1 ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            Previous
          </button>

          <span className="flex items-center font-semibold text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded ${page === totalPages ? 'bg-gray-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default BooksList;
