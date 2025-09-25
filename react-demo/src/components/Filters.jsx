import styles from './Filters.module.css';

const Filters = ({ activeFilter, setFilter, remainingCount }) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'done', label: 'Completed' },
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.buttons}>
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
