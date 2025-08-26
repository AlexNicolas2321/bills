export default function PrincipalList({ principals }) {
  return (
    <ul>
      {principals.map((p) => (
        <li key={p.id}> <strong>{p.title}</strong> - description: {p.description}</li>
      ))}
    </ul>
  );
}
