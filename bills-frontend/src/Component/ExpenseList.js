export default function ExpenseList({ expenses }) {
    return (
      <ul>
        {expenses.map((e) => (
          <li key={e.id}>
            <strong>{e.description}</strong> - amount: {e.amount} - {e.date}
          </li>
        ))}
      </ul>
    );
  }
  