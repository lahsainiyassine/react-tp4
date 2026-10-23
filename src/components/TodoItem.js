function TodoItem({ tache, changerEtat, supprimerTache }) {
  return (
    <li className={`todo-item ${tache.terminee ? 'completed' : ''}`}>
      <label className="todo-content">
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={tache.terminee}
          onChange={() => changerEtat(tache.id)}
        />
        <span
          className="todo-text"
          style={{ textDecoration: tache.terminee ? 'line-through' : 'none' }}
        >
          {tache.texte}
        </span>
      </label>
      <button
        type="button"
        className="btn-supprimer"
        onClick={() => supprimerTache(tache.id)}
        title="Supprimer la tâche"
      >
        Supprimer
      </button>
    </li>
  );
}

export default TodoItem;
