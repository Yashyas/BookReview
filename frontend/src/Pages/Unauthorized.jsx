import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized Access</h1>
        <p className="text-gray-700 mb-6">
          Oops! You don't have permission to view this page.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;
