import { useState } from "react";

export default function ExpenseForm({ principalId, onCreate, onUpdate, onDelete, expensesForDay }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) return alert("Description is required");
    if (!amount || parseFloat(amount) <= 0) return alert("Amount must be greater than 0");

    const newExpense = {
      description: description.trim(),
      amount: parseFloat(amount),
      principal: { id: principalId },
    };

    try {
      if (onCreate) await onCreate(newExpense);
      setDescription("");
      setAmount("");
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

      <ul>
        {expensesForDay.map((exp) => (
          <li key={exp.id} className="flex justify-between items-center gap-2 mb-1">
            <span>{exp.description} - {Number(exp.amount).toFixed(2)}€</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => {

                  const newDescription = prompt("New description", exp.description);
                  const newAmount = parseFloat(prompt("New amount", exp.amount));
                  if (newDescription && newAmount > 0) {
                    onUpdate(exp.id, {
                      description: newDescription,
                      amount: newAmount,
                      principal: { id: principalId }
                    });
                  }
              
              
              }}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Update
              </button>
              <button
                type="button"
                onClick={() => onDelete(exp.id)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
