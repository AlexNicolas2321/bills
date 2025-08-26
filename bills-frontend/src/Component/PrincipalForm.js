import { useState, useEffect } from "react";
import axios from "axios";

export default function PrincipalForm({ selectedDate, principal, onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Actualizar formulario cuando cambia el principal seleccionado
  useEffect(() => {
    if (principal) {
      setTitle(principal.title || "");
      setDescription(principal.description || "");
      setIsEditing(true);
    } else {
      setTitle("");
      setDescription("");
      setIsEditing(false);
    }
  }, [principal]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      // Formatear la fecha para el backend (YYYY-MM-DD)
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      const principalData = {
        title: title.trim(),
        description: description.trim(),
        date: formattedDate,
      };

      const response = await axios.post("http://localhost:8080/principal", principalData);

      // Limpiar campos solo si no estamos editando
      if (!isEditing) {
        setTitle("");
        setDescription("");
      }

      // Refrescar lista en App
      if (onCreated) onCreated(response.data);
    } catch (error) {
      console.error("Error saving principal:", error);
      alert("Error saving principal. Please try again.");
    }
  };

  const handleDelete = async () => {};

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <div className="p-2 border rounded bg-gray-100">
          Date: {selectedDate.toLocaleDateString()}
        </div>
        <div className="flex gap-2">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
