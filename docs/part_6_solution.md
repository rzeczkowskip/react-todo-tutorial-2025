```jsx
const filters = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Completed' },
];

<div>
  {filters.map((f) => (
    <button
      key={f.key}
      onClick={() => setFilter(f.key)}
      disabled={activeFilter === f.key}
    >
      {f.label}
    </button>
  ))}
</div>;
```
