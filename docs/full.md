# React tutorial

## Starter

🎯 **Cel:** przygotować środowisko, uruchomić pierwszy projekt React.

```shell
npm create vite@latest react-demo -- -t react
npm install
npm run dev
```

1. Use rolldown-vite (Experimental)? **No**
2. Install with npm and start now? **Yes**

- index.html – jeden root <div id="root">
- src/main.jsx – bootstrap Reacta
- src/App.jsx – nasza aplikacja
- src/assets/ – grafiki/CSS
- Włączony HMR – automatyczne odświeżanie

## Część 1 – Komponent i lista

🎯 **Cel:** zrozumieć komponent funkcyjny, JSX i wyrenderować listę.

```jsx
export default function App() {
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
}
```

📝 **Ćwiczenie:** dodaj i wyrenderuj kolejny element listy.

## Część 2 – Formularz i stan

🎯 **Cel:** dodać możliwość wprowadzania nowych zadań i zrozumieć useState.

```jsx
<form>
  <input placeholder="Co chcesz zrobić?" />
  <button>Dodaj</button>
</form>
```

### Obsługa wysyłki formularza

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  const data = new FormData(e.target);

  items.push({
    id: items.length + 1,
    text: data.get('task'),
    done: false,
  });

  // clear form inputs
  e.target.reset();
};
```

```jsx
<form onSubmit={handleSubmit}>
  <input placeholder="Co chcesz zrobić?" name="task" />
  <button>Dodaj</button>
</form>
```

### Stan

> ⚠️ Uwaga: po dodaniu elementu nic się nie zmieni na ekranie. Potrzebujemy stanu,
> który powiadomi React o zmianie i wywoła ponowne renderowanie.

```jsx
const [items, setItems] = useState([
  { id: 1, text: 'Nauka React', done: false },
  { id: 2, text: 'Spacer z psem', done: true },
]);
```

```jsx
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
```

📝 **Ćwiczenie:** zabezpiecz formularz tak, aby nie można było dodać pustego zadania.

## Część 3 – Zaznaczanie zadań

🎯 **Cel:** wprowadzić interakcję – odhaczanie i zmiana stylu tekstu.

```jsx
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
```

```jsx
<ul>
  {items.map((t) => (
    <li key={t.id}>
      <input
        type="checkbox"
        checked={t.done}
        onChange={() => toggleDone(t.id)} // toggle on change
      />
      <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
        {t.text}
      </span>
    </li>
  ))}
</ul>
```

📝 **Ćwiczenie:** wyświetl zakończone zadania na końcu listy (sort lub dwa .filter()).

## Część 4 – zapis w localStorage

🎯 **Cel:** utrwalić listę między odświeżeniami strony.

```jsx
const STORAGE_KEY = 'todo-items';
```

```jsx
const [items, setItems] = useState(() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
});
```

```jsx
import { useEffect, useState } from 'react';
```

```jsx
// called on every `items` change
useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}, [items]);
```

📝 **Ćwiczenie:** dodaj przycisk usuwający zakończone zadania.

```jsx
const removeItem = (id) => {
  setItems((prev) => prev.filter((item) => item.id !== id));
};
```

```jsx
{
  t.done && <button onClick={() => removeItem(t.id)}>usuń</button>;
}
```

## Część 5 – Filtry i licznik

🎯 **Cel:** wprowadzić widok „Wszystkie / Aktywne / Zakończone” i pokazać liczbę aktywnych.

**Filtry:**

```jsx
// possible values: 'all' | 'active' | 'done'
const [filter, setFilter] = useState('all');

const visibleItems = items.filter((item) => {
  if (filter === 'active') {
    return item.done === false;
  }

  if (filter === 'done') {
    return item.done;
  }

  return true;
});
```

**Licznik:**

```jsx
const remainingCount = items.filter((item) => !item.done).length;

<div>Pozostało do zrobienia: {remainingCount}</div>;
```

📝 **Ćwiczenie:** dodaj licznik zakończonych zadań obok licznika pozostałych do wykonania.

## Część 6 – Podział na komponenty.

🎯 **Cel:** rozbić aplikację na mniejsze komponenty dla lepszej czytelności.

**TodoItem.jsx**

```jsx
const TodoItem = ({ item, onToggle, onRemove }) => {
  return (
    <li>
      <input type="checkbox" checked={item.done} onChange={onToggle} />
      <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
        {item.text}
      </span>
      {item.done && <button onClick={onRemove}>usuń</button>}
    </li>
  );
};

export default TodoItem;
```

**TodoList.jsx**:

```jsx
import TodoItem from './TodoItem.jsx';

const TodoList = ({ items, toggleDone, removeItem }) => {
  return (
    <ul>
      {items
        .sort((a, b) => a.done - b.done)
        .map((t) => (
          <TodoItem
            key={t.id}
            item={t}
            onToggle={() => toggleDone(t.id)}
            onRemove={() => removeItem(t.id)}
          />
        ))}
    </ul>
  );
};

export default TodoList;
```

**Filters.jsx**

```jsx
const Filters = ({ activeFilter, setFilter, remainingCount }) => {
  return (
    <div>
      <div>
        <button
          onClick={() => setFilter('all')}
          disabled={activeFilter === 'all'}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          disabled={activeFilter === 'active'}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('done')}
          disabled={activeFilter === 'done'}
        >
          Completed
        </button>
      </div>
      <div>Pozostało do zrobienia: {remainingCount}</div>
    </div>
  );
};

export default Filters;
```

📝 **Ćwiczenie:** uprość renderowanie filtrów za pomocą pętli.

## Część 7 – Style

🎯 **Cel:** dodać prosty, estetyczny wygląd.

Usuń **App.css**.

**index.css**

```css
body {
  font-family: system-ui;
  margin: 1rem;
}
```

**Filters.module.css**

```css
.filters {
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    background-color: #eee;
    border: 0;
    padding: 0.5rem;
  }
}
```

```jsx
import styles from './Filters.module.css';

<div className={styles.filters}>
  <div className={styles.buttons}>
    {/* przyciski filtrów / pozostała część komponentu */}
  </div>
</div>;
```

**TodoList.module.css**

```css
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    text-decoration: underline;
    color: red;
    border: 0;
    background: none;
    padding: 0 0.5rem;

    &:hover {
      background: #eee;
    }
  }
}
```

```jsx
import styles from './TodoList.module.css';

<ul className={styles.list}>
  {/* elementy listy – pętla <TodoItem ... /> */}
</ul>;
```
