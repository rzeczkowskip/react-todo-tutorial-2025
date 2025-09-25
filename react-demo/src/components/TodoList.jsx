import styles from './TodoList.module.css';
import TodoItem from './TodoItem.jsx';

const TodoList = ({ items, toggleDone }) => {
  return (
    <ul className={styles.list}>
      {items
        .sort((a, b) => a.done - b.done)
        .map((t) => (
          <TodoItem key={t.id} item={t} onToggle={() => toggleDone(t.id)} />
        ))}
    </ul>
  );
};

export default TodoList;
