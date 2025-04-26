import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
            alt="Books"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Text Content */}
        <div>
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">About BookNest 📚</h2>
          <p className="text-gray-700 text-lg mb-4">
            <strong>BookNest</strong> is a dynamic online platform designed for book lovers to explore, review, and rate their favorite books. 
            Our goal is to build a vibrant community where readers can discover new titles, share honest feedback, and connect through their love of literature.
          </p>
          <p className="text-gray-700 text-lg mb-4">
            Whether you're a casual reader or a passionate bibliophile, BookNest gives you the space to voice your opinions, keep track of books you love, and inspire others.
          </p>

          <h3 className="text-2xl font-semibold text-indigo-600 mt-8 mb-4">Technologies Used 🛠</h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li><strong>Frontend:</strong> React.js (Vite + TailwindCSS)</li>
            <li><strong>State Management:</strong> Context API</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB Atlas (Cloud database)</li>
            <li><strong>Authentication:</strong> JWT (JSON Web Tokens)</li>
            <li><strong>Deployment:</strong> Vercel (Frontend) + Render / Railway (Backend)</li>
          </ul>

          <h3 className="text-2xl font-semibold text-indigo-600 mt-8 mb-4">Project Purpose 🎯</h3>
          <p className="text-gray-700 text-lg">
            The main purpose of BookNest is to empower users to explore a wide range of books, 
            contribute reviews, rate their favorite reads, and foster a thriving book-loving community online. 
            Admins maintain the platform by adding new books to keep the collection growing!
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
