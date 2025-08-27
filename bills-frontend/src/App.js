import { useState, useEffect } from "react";
import axios from "axios";

import PrincipalForm from './Component/PrincipalForm';
import ExpenseForm from './Component/ExpenseForm';
import PrincipalCalendar from './Component/PrincipalCalendar';

function App() {
  const [principals, setPrincipals] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [principalForDay, setPrincipalForDay] = useState(null);
  const [expensesForDay, setExpensesForDay] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resPrincipals, resExpenses] = await Promise.all([
        axios.get("http://localhost:8080/principal"),
        axios.get("http://localhost:8080/expenses"),
      ]);

      // Transformar string de fecha a objeto Date
      const principalsWithDate = resPrincipals.data.map(p => {
        const dateParts = p.date.split('-').map(Number);
        return { ...p, date: new Date(dateParts[0], dateParts[1] - 1, dateParts[2]) };
      });

      setPrincipals(principalsWithDate);
      setExpenses(resExpenses.data);

      // Actualizar principal del día seleccionado
      updatePrincipalForDay(principalsWithDate, resExpenses.data, selectedDate);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updatePrincipalForDay = (allPrincipals, allExpenses, date) => {
    const p = allPrincipals.find(
      pp => pp.date && pp.date.toDateString() === date.toDateString()
    );
    setPrincipalForDay(p || null);

    const relatedExpenses = p
      ? allExpenses.filter(e => e.principal && e.principal.id === p.id)
      : [];
    setExpensesForDay(relatedExpenses);
  };

  const handleDateChange = ({ date }) => {
    setSelectedDate(date);
    updatePrincipalForDay(principals, expenses, date);
  };

  // Crear o actualizar principal
  const handleUpdatePrincipal = async (updatedData) => {
    if (!principalForDay) return;
    try {
      await axios.put(`http://localhost:8080/principal/${principalForDay.id}`, updatedData);
      await fetchData();
    } catch (error) {
      console.error("Error updating principal:", error);
      alert("Error updating principal. Try again.");
    }
  };

  const handleDeletePrincipal = async (id) => {
    if (!window.confirm("Are you sure you want to delete this principal?")) return;

    try {
      await axios.delete(`http://localhost:8080/principal/${id}`);
      await fetchData();
    } catch (error) {
      console.error("Error deleting principal:", error);
      alert("Error deleting principal. Please try again.");
    }
  };


  // Crear principal
const handleCreatePrincipal = async (newData) => {
  try {
    await axios.post("http://localhost:8080/principal", newData);
    await fetchData(); // refrescar después de crear
  } catch (error) {
    console.error("Error creating principal:", error);
    alert("Error creating principal. Please try again.");
  }
};

  return (
    <div>
      <h1>Calendar</h1>
      <PrincipalCalendar
        principals={principals}
        expenses={expenses}
        onDateChange={handleDateChange}
      />

      <h1>Principal</h1>
      <PrincipalForm
        selectedDate={selectedDate}
        principal={principalForDay}
        onCreated={handleCreatePrincipal}
        onDelete={handleDeletePrincipal}
        onUpdate={handleUpdatePrincipal}
      />

      <h1>Expenses</h1>
      {principalForDay ? (
        <ExpenseForm
          principalId={principalForDay.id}
          onCreate={fetchData}
        />
      ) : (
        <p>Create a Principal for this day first.</p>
      )}

      {principalForDay && (
        <div style={{ marginTop: 12 }}>
          <h3>Expenses of the day</h3>
          {expensesForDay.length ? (
            <ul>
              {expensesForDay.map((exp) => (
                <li key={exp.id}>
                  {exp.description} - {Number(exp.amount).toFixed(2)}€
                </li>
              ))}
            </ul>
          ) : (
            <p>There are not expenses for this day</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
