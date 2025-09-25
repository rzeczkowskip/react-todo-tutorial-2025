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

  // possible values: 'all' | 'active' | 'done'
  const [filter, setFilter] = useState('all');

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

  const clearCompleted = () => {
    setItems((prev) => prev.filter((item) => !item.done));
  };

  const visibleItems = items.filter((item) => {
    if (filter === 'active') {
      return item.done === false;
    }

    if (filter === 'done') {
      return item.done;
    }

    return true;
  });

  const remainingCount = items.filter((item) => !item.done).length;
  const completedCount = items.filter((item) => item.done).length;

  return (
    <main>
      <h1>Do zrobienia</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Co chcesz zrobić?" name="task" />
        <button>Dodaj</button>
      </form>
      <button onClick={clearCompleted}>Usuń zakończone</button>

      <div>
        <div>
          <button onClick={() => setFilter('all')} disabled={filter === 'all'}>
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            disabled={filter === 'active'}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('done')}
            disabled={filter === 'done'}
          >
            Completed
          </button>
        </div>
        <div>Pozostało do zrobienia: {remainingCount}</div>
        <div>Zakończone: {completedCount}</div>
      </div>

      <ul>
        {visibleItems
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
