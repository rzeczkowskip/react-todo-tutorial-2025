const TodoItem = ({ item, onToggle }) => {
  return (
    <li>
      <input type="checkbox" checked={item.done} onChange={onToggle} />
      <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>
        {item.text}
      </span>
    </li>
  );
};

export default TodoItem;
