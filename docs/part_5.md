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

```jsx
<div>
  <div>
    <button
      onClick={() => setFilter('all')}
      disabled={filter === 'all'}
    >
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
</div>
```

**Licznik:**

```jsx
const remainingCount = items.filter((item) => !item.done).length;

<div>Pozostało do zrobienia: {remainingCount}</div>;
```

📝 **Ćwiczenie:** dodaj licznik zakończonych zadań obok licznika pozostałych do wykonania.
