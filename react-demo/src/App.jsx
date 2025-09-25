import { useState } from 'react';

const App = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Nauka React', done: false },
    { id: 2, text: 'Spacer z psem', done: true },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const task = data.get('task').trim();

    // skip empty values
    if (!task) {
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: task,
        done: false,
      },
    ]);

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
