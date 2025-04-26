import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api'; // your axios instance

function HomePage() {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await API.get('/api/books?page=1');
        setFeaturedBooks(response.data.books); // adjust according to your backend response
      } catch (error) {
        console.error('Error fetching featured books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to BookNest 📚</h1>
          <p className="text-lg md:text-2xl mb-6">
            Discover, Read, and Share Reviews on Your Favorite Books!
          </p>
          <Link
            to="/register"
            className="inline-block bg-white text-indigo-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">About BookNest</h2>
          <p className="text-gray-600 text-lg">
            At BookNest, we believe books are a gateway to different worlds. We aim to build a
            community where book lovers can discover amazing reads, share their thoughts, and
            inspire each other through honest reviews and ratings.
          </p>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">✨ Featured Books</h2>

          {loading ? (
            <div className="flex justify-center">
              <div className="text-gray-600 text-lg">Loading books...</div>
            </div>
          ) : (
            <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
              {featuredBooks.length > 0 ? (
                featuredBooks.map((book) => (
                  <div key={book._id} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
                    <img
                      src={book.coverImage || 'https://via.placeholder.com/400x600?text=No+Image'}
                      alt={book.title}
                      className="w-full h-64 object-cover rounded mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-700">{book.title}</h3>
                    <p className="text-gray-500">by {book.author}</p>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600">No books found!</div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
