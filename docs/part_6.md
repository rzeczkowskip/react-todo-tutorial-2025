## Część 6 – Podział na komponenty.

🎯 **Cel:** rozbić aplikację na mniejsze komponenty dla lepszej czytelności.

**TodoItem.jsx**

```jsx
const TodoItem = ({ item, onToggle }) => {
  return (
    <li>
      <input type="checkbox" checked={item.done} onChange={onToggle} />
      <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
        {item.text}
      </span>
    </li>
  );
};

export default TodoItem;
```

**TodoList.jsx**:

```jsx
import TodoItem from './TodoItem.jsx';

const TodoList = ({ items, toggleDone }) => {
  return (
    <ul>
      {items
        .sort((a, b) => a.done - b.done)
        .map((t) => (
          <TodoItem key={t.id} item={t} onToggle={() => toggleDone(t.id)} />
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
