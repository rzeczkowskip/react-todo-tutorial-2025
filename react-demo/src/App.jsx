import { useEffect, useState } from 'react';

const STORAGE_KEY = 'todo-items';

const App = () => {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // called on every `items` change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

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

  const toggleDone = (id) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done }; // new object returned
        }

        return item;
      }),
    );
  };

  return (
    <main>
      <h1>Do zrobienia</h1>

      <form onSubmit={handleSubmit}>
        <input placeholder="Co chcesz zrobić?" name="task" />
        <button>Dodaj</button>
      </form>

      <ul>
        {items
          .slice()
          .sort((a, b) => a.done - b.done) // sort items by done state
          .map((t) => (
            <li key={t.id}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleDone(t.id)}
              />
              <span
                style={{ textDecoration: t.done ? 'line-through' : 'none' }}
              >
                {t.text}
              </span>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default App;
