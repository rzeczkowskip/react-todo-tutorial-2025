```jsx
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
        <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
          {t.text}
        </span>
      </li>
    ))}
</ul>
```
