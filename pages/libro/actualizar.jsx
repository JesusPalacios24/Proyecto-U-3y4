import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ActualizarLibro() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: ''
  });
  const API_URL = id ? `http://localhost:8000/libros/${id}/` : null;

  useEffect(() => {
    const fetchBook = async () => {
      if (!API_URL) return;

      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
        setFormData({ title: data.title, author: data.author, content: data.content });
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      }
    };

    if (id !== undefined) {
      fetchBook();
    }
  }, [id, API_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!API_URL) return;

    try {
      const response = await fetch(`${API_URL}actualizar/`, { // Asegúrate de que la URL sea para la actualización
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Datos actualizados correctamente");
      // Redirige al usuario a la página de detalles del libro usando el ID correcto
      router.push(`/libro/${id}`);
    } catch (error) {
      console.error("Error al actualizar el libro:", error.message);
      alert("Ocurrió un error al actualizar el libro");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Actualizar Libro</h1>
      {book ? (
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-2">
            <label className="block">Título:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-2">
            <label className="block">Autor:</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="w-full border p-2"
            />
          </div>
          <div className="mb-2">
            <label className="block">Contenido:</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full border p-2"
              rows="4"
            ></textarea>
          </div>
          <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
            Guardar Cambios
          </button>
        </form>
      ) : (
        <p className="text-gray-500">Cargando...</p>
      )}
    </div>
  );
}
