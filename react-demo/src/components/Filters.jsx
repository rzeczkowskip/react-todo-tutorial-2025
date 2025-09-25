const Filters = ({ activeFilter, setFilter, remainingCount }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'done', label: 'Completed' },
  ];

  return (
    <div>
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
      </div>
      <div>Pozostało do zrobienia: {remainingCount}</div>
    </div>
  );
};

export default Filters;
