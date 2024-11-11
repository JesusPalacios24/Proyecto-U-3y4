// pages/libro/[id].jsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const API_URL = `http://localhost:8000/libros/${id}/`;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Libro</h1>
      {book ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p><strong>ID:</strong> {book.id}</p>
          <p><strong>Título:</strong> {book.title}</p>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Contenido:</strong> {book.content}</p>
          <button onClick={() => router.push("/")} className="mt-4 bg-blue-500 text-white px-4 py-1 rounded">
            Volver al Inicio
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando...</p>
      )}
    </div>
  );
}

