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
