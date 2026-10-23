import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

const TACHES_INITIALES = [
  { id: 1, texte: 'Découvrir les composants React', terminee: true },
  { id: 2, texte: 'Gérer le state avec useState', terminee: true },
  { id: 3, texte: 'Compléter le TP 4 : To-Do List interactive', terminee: false },
];

function App() {
  // Initialisation avec persistance localStorage (Étape 10 - Bonus)
  const [taches, setTaches] = useState(() => {
    const donneesSauvegardees = localStorage.getItem('taches_react_tp4');
    if (donneesSauvegardees) {
      try {
        return JSON.parse(donneesSauvegardees);
      } catch (error) {
        console.error('Erreur lors du chargement du localStorage:', error);
      }
    }
    return TACHES_INITIALES;
  });

  // Filtre actif : 'toutes', 'en-cours', 'terminees'
  const [filtre, setFiltre] = useState('toutes');

  // Sauvegarde automatique dans localStorage à chaque modification
  useEffect(() => {
    localStorage.setItem('taches_react_tp4', JSON.stringify(taches));
  }, [taches]);

  // Ajouter une nouvelle tâche
  const ajouterTache = (texte) => {
    const nouvelleTache = {
      id: Date.now(),
      texte,
      terminee: false,
    };
    setTaches([...taches, nouvelleTache]);
  };

  // Cocher / décocher une tâche
  const changerEtat = (id) => {
    setTaches(
      taches.map((t) => (t.id === id ? { ...t, terminee: !t.terminee } : t))
    );
  };

  // Supprimer une tâche
  const supprimerTache = (id) => {
    setTaches(taches.filter((t) => t.id !== id));
  };

  // Supprimer toutes les tâches terminées (Bonus)
  const effacerTerminees = () => {
    setTaches(taches.filter((t) => !t.terminee));
  };

  // Calcul du nombre de tâches en cours et terminées
  const totalTaches = taches.length;
  const tachesTerminees = taches.filter((t) => t.terminee).length;
  const tachesEnCours = totalTaches - tachesTerminees;

  // Filtrage selon le filtre sélectionné
  const tachesAffichees = taches.filter((tache) => {
    if (filtre === 'en-cours') return !tache.terminee;
    if (filtre === 'terminees') return tache.terminee;
    return true;
  });

  return (
    <div className="App">
      <div className="todo-container">
        <header className="todo-header">
          <h1>Ma To-Do List Interactive</h1>
          <p className="subtitle">TP 4 – Synthèse React &amp; Gestion d'état</p>
        </header>

        {/* Formulaire d'ajout (Étape 4A) */}
        <TodoForm ajouterTache={ajouterTache} />

        {/* Barre de filtres et statistiques (Étape 10 - Bonus) */}
        <div className="todo-toolbar">
          <div className="filter-buttons">
            <button
              type="button"
              className={`filter-btn ${filtre === 'toutes' ? 'active' : ''}`}
              onClick={() => setFiltre('toutes')}
            >
              Toutes ({totalTaches})
            </button>
            <button
              type="button"
              className={`filter-btn ${filtre === 'en-cours' ? 'active' : ''}`}
              onClick={() => setFiltre('en-cours')}
            >
              En cours ({tachesEnCours})
            </button>
            <button
              type="button"
              className={`filter-btn ${filtre === 'terminees' ? 'active' : ''}`}
              onClick={() => setFiltre('terminees')}
            >
              Terminées ({tachesTerminees})
            </button>
          </div>

          {tachesTerminees > 0 && (
            <button
              type="button"
              className="btn-clear-completed"
              onClick={effacerTerminees}
              title="Supprimer toutes les tâches terminées"
            >
              Nettoyer terminées
            </button>
          )}
        </div>

        {/* Liste des tâches (Étape 5A & 6A) */}
        <TodoList
          taches={tachesAffichees}
          changerEtat={changerEtat}
          supprimerTache={supprimerTache}
        />

        {/* Pied de page récapitulatif */}
        <footer className="todo-footer">
          <span>
            {tachesEnCours === 0 && totalTaches > 0
              ? '🎉 Toutes les tâches sont terminées ! Félicitations !'
              : totalTaches === 0
              ? 'Aucune tâche enregistrée.'
              : `${tachesEnCours} tâche${tachesEnCours > 1 ? 's' : ''} restante${tachesEnCours > 1 ? 's' : ''}`}
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
