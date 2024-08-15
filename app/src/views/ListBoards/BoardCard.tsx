import React from 'react';
import { Link } from 'react-router-dom';
const BoardCard = ({ board, onEdit, onDelete }) => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg flex-col justify-between items-center">
      {/* Board Name */}
      <Link to={`/board/${board.id}`}>
        <div className="font-bold text-lg underline">{board.name}</div>
      </Link>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {/* Edit Button */}
        <button
          onClick={() => onEdit(board.id)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(board.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
