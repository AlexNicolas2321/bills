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

        const principalsWithDate = resPrincipals.data.map(p => {
        const dateParts = p.date.split('-').map(Number);
        return { ...p, date: new Date(dateParts[0], dateParts[1]-1, dateParts[2]) };
      });

      setPrincipals(principalsWithDate);
      setExpenses(resExpenses.data);

      // Recalcular selección actual con los nuevos datos
      const p = principalsWithDate.find(
        (pp) => pp.date && pp.date.toDateString() === selectedDate.toDateString()
      );
      setPrincipalForDay(p || null);
      const related = p
        ? resExpenses.data.filter((e) => e.principal && e.principal.id === p.id)
        : [];
      setExpensesForDay(related);
    } catch (error) {
      console.error("Error fetching data:", error);
    } 
  };

   // Cada vez que seleccionamos un día en el calendario
   const handleDateChange = ({ date, principal, expenses }) => {
    setSelectedDate(date);
    setPrincipalForDay(principal);
    setExpensesForDay(expenses);
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
      onCreated={fetchData} // refresca la lista después de crear/editar
    />

    <h1>Expenses</h1>
    {principalForDay ? (
      <ExpenseForm
        principalId={principalForDay.id}
        onCreate={fetchData} // refresca la lista después de crear
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
              <li key={exp.id}>{exp.description} - {Number(exp.amount).toFixed(2)}€</li>
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
