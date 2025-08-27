import { useState } from "react";
import axios from "axios";

export default function ExpenseForm({ onCreate, principalId }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      alert("Description is required");
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    try {
      await axios.post("http://localhost:8080/expenses", {
        description: description.trim(),
        amount: parseFloat(amount),
        principal: { id: principalId },
      });

      setDescription("");
      setAmount("");

      if (onCreate) await onCreate();
    } catch (error) {
      console.error("Error creating expense:", error);
      alert("Error creating expense. Please try again.");
    }
  };

  

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          step="0.01"
          min="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <button type="submit">Create Expense</button>
      </form>
    </div>
  );
}
