import { useState } from 'react';

function TodoForm({ ajouterTache }) {
  const [texte, setTexte] = useState('');

  const soumettreFormulaire = (e) => {
    e.preventDefault();
    if (!texte.trim()) return;
    ajouterTache(texte.trim());
    setTexte('');
  };

  return (
    <form className="todo-form" onSubmit={soumettreFormulaire}>
      <input
        type="text"
        className="todo-input"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Ajouter une nouvelle tâche..."
      />
      <button type="submit" className="btn-ajouter">
        Ajouter
      </button>
    </form>
  );
}

export default TodoForm;
