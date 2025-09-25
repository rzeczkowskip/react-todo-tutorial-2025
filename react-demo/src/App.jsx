const App = () => {
  const items = [
    { id: 1, text: 'Nauka React', done: false },
    { id: 2, text: 'Spacer z psem', done: true },
    { id: 3, text: 'Szamka', done: false }, // ← new element
  ];

  return (
    <main>
      <h1>Do zrobienia</h1>

      <form>
        <input placeholder="Co chcesz zrobić?" />
        <button>Dodaj</button>
      </form>

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
