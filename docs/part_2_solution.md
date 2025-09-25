```jsx
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
```
