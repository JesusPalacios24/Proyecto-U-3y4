import { useEffect, useState, useRef } from "react";

export default function LibrosR() {
  const [rentedBooks, setRentedBooks] = useState([]);
  const socketRef = useRef(null); // Asegúrate de inicializar el socketRef
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    // Conectar WebSocket
    socketRef.current = new WebSocket("ws://localhost:8001/ws/libros/");

    socketRef.current.onopen = () => {
      console.log("WebSocket conectado");
      setSocketConnected(true);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket desconectado");
      setSocketConnected(false);
    };

    socketRef.current.onerror = (error) => {
      console.error("Error en WebSocket:", error);
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "rent_book") {
        const rentedBook = { id: message.bookId, title: message.title };
        // Actualiza la lista de libros rentados
        setRentedBooks((prevBooks) => [...prevBooks, rentedBook]);
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Libros Rentados</h1>

          <table className="min-w-full table-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Título</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rentedBooks.map((book) => (
                <tr key={book.id} className="border-t hover:bg-gray-100">
                  <td className="py-2 px-4 text-gray-800">{book.id}</td>
                  <td className="py-2 px-4 text-gray-800">{book.title}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Asegúrate de tener más espacio si hay pocos libros rentados */}
          {rentedBooks.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No hay libros rentados aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}
