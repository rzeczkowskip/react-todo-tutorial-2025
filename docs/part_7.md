## Część 7 – Style

🎯 **Cel:** dodać prosty, estetyczny wygląd.

Usuń **App.css**.

**index.css**

```css
body {
  font-family: system-ui;
  margin: 1rem;
}
```

**Filters.module.css**

```css
.filters {
  padding: 1rem 0;
  margin: 1rem 0;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}

.buttons {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;

  button {
    background-color: #eee;
    border: 0;
    padding: 0.5rem;
  }
}
```

```jsx
import styles from './Filters.module.css';

<div className={styles.filters}>
  <div className={styles.buttons}>
    {/* przyciski filtrów / pozostała część komponentu */}
  </div>
</div>;
```

**TodoList.module.css**

```css
.list {
  list-style-type: none;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  button {
    text-decoration: underline;
    color: red;
    border: 0;
    background: none;
    padding: 0 0.5rem;

    &:hover {
      background: #eee;
    }
  }
}
```

```jsx
import styles from './TodoList.module.css';

<ul className={styles.list}>
  {/* elementy listy – pętla <TodoItem ... /> */}
</ul>;
```
