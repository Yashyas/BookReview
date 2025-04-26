import { useState } from 'react';
import API from '../api';

function AdminPanel() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddBook = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await API.post('/api/books', {
        title,
        author,
        description,
        coverImage,
      });

      setMessage('✅ Book added successfully!');
      // Clear form fields
      setTitle('');
      setAuthor('');
      setDescription('');
      setCoverImage('');
    } catch (error) {
      console.error('Failed to add book:', error);
      setMessage('❌ Failed to add book. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          📚 Admin Panel - Add New Book
        </h1>

        <form onSubmit={handleAddBook} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter author's name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows="4"
              placeholder="Enter book description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Paste image URL here"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Adding Book...' : 'Add Book'}
          </button>

          {message && (
            <p className={`text-center font-semibold mt-4 ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
