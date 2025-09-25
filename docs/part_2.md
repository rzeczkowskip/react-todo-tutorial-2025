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
