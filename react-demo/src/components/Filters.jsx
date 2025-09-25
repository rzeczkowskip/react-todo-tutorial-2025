const Filters = ({ activeFilter, setFilter, remainingCount }) => {
  return (
    <div>
      <div>
        <button
          onClick={() => setFilter('all')}
          disabled={activeFilter === 'all'}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          disabled={activeFilter === 'active'}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('done')}
          disabled={activeFilter === 'done'}
        >
          Completed
        </button>
      </div>
      <div>Pozostało do zrobienia: {remainingCount}</div>
    </div>
  );
};

export default Filters;
