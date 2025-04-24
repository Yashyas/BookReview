import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-[#B2E0D6] shadow-md rounded-md p-4">
      <img src={book.coverImage} alt={book.title} className="h-48 w-full object-cover rounded" />
      <h2 className="text-lg font-semibold mt-2 text-[#36454F]">{book.title}</h2>
      <p className="text-sm text-[#36454F]">{book.author}</p>
      <Link to={`/books/${book._id}`} className="text-sm text-[#36454F] underline mt-2 block">
        View Details
      </Link>
    </div>
  );
};

export default BookCard;
