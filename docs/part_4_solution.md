```jsx
const clearCompleted = () => {
  setItems((prev) => prev.filter((item) => !item.done));
};

<button onClick={clearCompleted}>Usuń zakończone</button>;
```
