import React, { useState, useEffect, useRef } from "react";

export default function RentedBooks() {
  const [rentedBooks, setRentedBooks] = useState([]); // Estado para libros rentados
  const socketRef = useRef(null); // Referencia para el WebSocket

  useEffect(() => {
    // Conectar al WebSocket
    socketRef.current = new WebSocket("ws://localhost:8001/ws/libros/");

    socketRef.current.onopen = () => {
      console.log("Conexión WebSocket abierta para libros rentados");
    };

    socketRef.current.onclose = () => {
      console.log("Conexión WebSocket cerrada");
    };

    // Escuchar mensajes del WebSocket
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Mensaje recibido del servidor:", data);

      if (data.type === "rent_book" && data.bookId) {
        console.log(`Libro rentado: ID ${data.bookId}, Título ${data.title}`);
        setRentedBooks((prevRentedBooks) => [
          ...prevRentedBooks,
          { id: data.bookId, title: data.title },
        ]);
      }
    };

    // Manejar errores
    socketRef.current.onerror = (error) => {
      console.error("Error WebSocket:", error);
    };

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Libros Rentados</h2>
      {rentedBooks.length === 0 ? (
        <p>No hay libros rentados.</p>
      ) : (
        <ul>
          {rentedBooks.map((book) => (
            <li key={book.id} className="mb-2">
              {book.title} (ID: {book.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

