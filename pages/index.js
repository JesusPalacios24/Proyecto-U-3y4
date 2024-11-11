import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newBook, setNewBook] = useState({ id: "", title: "", author: "", content: "" });
  const API_URL = "http://localhost:8000/libros/"; // Asegúrate de que esta URL esté correcta
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addBook = async () => {
    try {
      const response = await fetch(`${API_URL}nuevo/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setItems((prevItems) => [...prevItems, data]);
      setNewBook({ id: "", title: "", author: "", content: "" });
    } catch (error) {
      console.error("Error al agregar el libro:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await fetch(`${API_URL}${id}/eliminar/`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
    }
  };

  const goToBookDetails = (id) => {
    router.push(`/libro/${id}`);
  };

  const viewRentedBooks = () => {
    router.push('/ui/librosR'); // Asegúrate de que esta ruta esté definida en 'pages/ui/librosR.jsx'
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Libros</h1>
      {loading ? (
        <p className="text-gray-500">Cargando...</p>
      ) : (
        <div>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Título</th>
                <th className="py-2 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.title}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => goToBookDetails(item.id)}
                      className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => deleteBook(item.id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            <input
              type="text"
              value={newBook.id}
              onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
              placeholder="ID del libro"
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              placeholder="Título del libro"
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              placeholder="Autor del libro"
              className="border rounded px-2 py-1 mr-2"
            />
            <input
              type="text"
              value={newBook.content}
              onChange={(e) => setNewBook({ ...newBook, content: e.target.value })}
              placeholder="Contenido del libro"
              className="border rounded px-2 py-1 mr-2"
            />
            <button onClick={addBook} className="bg-blue-500 text-white px-4 py-1 rounded">
              Añadir Libro
            </button>
          </div>
          <button onClick={viewRentedBooks} className="my-9 bg-green-500 text-white px-4 py-1 rounded mb-4">
            Ver Libros Rentados
          </button>
        </div>
      )}
    </div>
  );
}
