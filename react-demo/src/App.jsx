const App = () => {
  const items = [
    { id: 1, text: 'Nauka React', done: false },
    { id: 2, text: 'Spacer z psem', done: true },
  ];

  return (
    <main>
      <h1>Do zrobienia</h1>
      <ul>
        {items.map((t) => (
          <li key={t.id}>
            <input type="checkbox" defaultChecked={t.done} disabled /> {t.text}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
