import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function PrincipalCalendar({ principals, expenses, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClickDay = (date) => {
    setSelectedDate(date);

    const principal = principals.find(
      (p) => p.date && p.date.toDateString() === date.toDateString()
    );

    const relatedExpenses = principal
      ? expenses.filter(e => e.principal && e.principal.id === principal.id)
      : [];

    // Avisamos a App de la selección
    onDateChange?.({
      date,
      principal: principal || null,
      expenses: relatedExpenses
    });
  };

  return <Calendar value={selectedDate} onClickDay={handleClickDay} />;
}
