import React from 'react';

const BookCard = ({ book }) => {
    return (
        <div className="flex border rounded-lg shadow-lg overflow-hidden max-w-md m-4">
            <img src={book.image} alt={book.title} className="w-24 h-auto object-cover" />
            <div className="p-4 flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-600"><strong>ID:</strong> {book.id}</p>
                <p className="text-sm text-gray-600"><strong>Autor:</strong> {book.author}</p>
                <p className="text-sm text-gray-700 mt-2">{book.content}</p>
            </div>
        </div>
    );
};

export default BookCard;
