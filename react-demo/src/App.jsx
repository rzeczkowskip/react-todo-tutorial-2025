import { useState } from 'react';

const App = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Nauka React', done: false },
    { id: 2, text: 'Spacer z psem', done: true },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    setItems((prev) => [
      ...prev, // copy existing items
      {
        id: Date.now(), // generate id by using current time
        text: data.get('task'),
        done: false,
      },
    ]);

    // clear form inputs
    e.target.reset();
  };

  return (
    <main>
      <h1>Do zrobienia</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Co chcesz zrobić?" name="task" />
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
