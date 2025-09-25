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
