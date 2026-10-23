import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('affiche le titre principal de la To-Do List', () => {
  render(<App />);
  const titre = screen.getByText(/Ma To-Do List Interactive/i);
  expect(titre).toBeInTheDocument();
});

test('permet d\'ajouter une nouvelle tâche', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Ajouter une nouvelle tâche/i);
  const boutonAjouter = screen.getByRole('button', { name: /Ajouter/i });

  fireEvent.change(input, { target: { value: 'Tester mon application React' } });
  fireEvent.click(boutonAjouter);

  expect(screen.getByText('Tester mon application React')).toBeInTheDocument();
  expect(input.value).toBe('');
});

test('n\'ajoute pas de tâche si le champ est vide ou composé d\'espaces', () => {
  render(<App />);
  const input = screen.getByPlaceholderText(/Ajouter une nouvelle tâche/i);
  const boutonAjouter = screen.getByRole('button', { name: /Ajouter/i });

  const initialItems = screen.getAllByRole('listitem');

  fireEvent.change(input, { target: { value: '    ' } });
  fireEvent.click(boutonAjouter);

  const updatedItems = screen.getAllByRole('listitem');
  expect(updatedItems.length).toBe(initialItems.length);
});

test('permet de cocher et décocher une tâche', () => {
  render(<App />);
  const checkboxes = screen.getAllByRole('checkbox');
  const firstCheckbox = checkboxes[0];

  const initialState = firstCheckbox.checked;
  fireEvent.click(firstCheckbox);
  expect(firstCheckbox.checked).toBe(!initialState);
});

test('permet de supprimer une tâche', () => {
  render(<App />);
  const deleteButtons = screen.getAllByRole('button', { name: /Supprimer/i });
  const initialCount = deleteButtons.length;

  fireEvent.click(deleteButtons[0]);

  const remainingDeleteButtons = screen.getAllByRole('button', { name: /Supprimer/i });
  expect(remainingDeleteButtons.length).toBe(initialCount - 1);
});

test('permet de filtrer les tâches', () => {
  render(<App />);
  const btnEnCours = screen.getByRole('button', { name: /En cours/i });
  fireEvent.click(btnEnCours);

  // Vérifie que seules les tâches non terminées sont affichées
  const checkboxes = screen.getAllByRole('checkbox');
  checkboxes.forEach((cb) => {
    expect(cb.checked).toBe(false);
  });
});
