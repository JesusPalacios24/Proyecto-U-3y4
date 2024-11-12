import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function BookDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [newContent, setNewContent] = useState("");
  const API_URL = `http://localhost:8000/libros/${id}/`;

  // Obtener los detalles del libro
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
        setNewContent(data.content);
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleUpdateContent = async () => {
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedBook = await response.json();
      setBook(updatedBook);
      alert("Contenido actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el contenido:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalles del Libro</h1>
      {book ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p><strong>ID:</strong> {book.id}</p>
          <p><strong>Título:</strong> {book.title}</p>
          <p><strong>Autor:</strong> {book.author}</p>
          <p><strong>Contenido:</strong> {book.content}</p>
          <button
            onClick={() => router.push(`/libro/actualizar?id=${book.id}`)}
            className="mt-4 bg-yellow-500 text-white px-4 py-1 rounded"
          >
            Editar Libro
          </button>
          <button
            onClick={() => router.push("/")}
            className="mt-4 bg-gray-500 text-white px-4 py-1 rounded ml-2"
          >
            Volver al Inicio
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Cargando...</p>
      )}
    </div>
  );
}
