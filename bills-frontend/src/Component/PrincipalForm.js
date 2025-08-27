import { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

export default function PrincipalForm({ selectedDate, principal, onCreated, onDelete, onUpdate }) {
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

    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    const principalData = {
      title: title.trim(),
      description: description.trim(),
      date: formattedDate,
    };

    try {
      if (isEditing && onUpdate) {
        // Actualizar
        await onUpdate(principalData);
      } else if (!isEditing && onCreated) {
        // Crear
        await onCreated(principalData);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error saving principal:", error);
      alert("Error saving principal. Please try again.");
    }
  };

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
          <button type="submit">{isEditing ? "Update" : "Create"}</button>
          {isEditing && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(principal.id)}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
