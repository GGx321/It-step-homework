import { useState } from 'react';
import Block from '../../components/Block';

interface Recipe {
  id: number;
  name: string;
  author: string;
}

const INITIAL_RECIPES: Recipe[] = [
  { id: 1, name: 'Борщ', author: 'Баба Галя' },
  { id: 2, name: 'Паста Карбонара', author: 'Chef Marco' },
  { id: 3, name: 'Вареники з картоплею', author: 'Тітка Марія' },
  { id: 4, name: 'Піца Маргарита', author: 'Giuseppe' },
  { id: 5, name: 'Голубці', author: 'Баба Параска' },
];

export default function RecipeManager() {
  const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
  const [newRecipeName, setNewRecipeName] = useState('');
  const [newRecipeAuthor, setNewRecipeAuthor] = useState('');

  // Удаление рецепта
  const handleDeleteRecipe = (id: number) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== id),
    );
  };

  // Добавление нового рецепта
  const handleAddRecipe = () => {
    if (!newRecipeName.trim() || !newRecipeAuthor.trim()) {
      alert('Будь ласка, заповніть всі поля');
      return;
    }

    const newRecipe: Recipe = {
      id: Date.now(), // Уникальный ID через timestamp
      name: newRecipeName.trim(),
      author: newRecipeAuthor.trim(),
    };

    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    setNewRecipeName('');
    setNewRecipeAuthor('');
  };

  // Сортировка по названию
  const handleSortByName = () => {
    setRecipes((prevRecipes) =>
      [...prevRecipes].sort((a, b) => a.name.localeCompare(b.name)),
    );
  };

  // Перемешивание списка
  const handleShuffleRecipes = () => {
    setRecipes((prevRecipes) =>
      [...prevRecipes].sort(() => Math.random() - 0.5),
    );
  };

  return (
    <div className="space-y-6">
      {/* Форма добавления рецепта */}
      <Block className="block">
        <h3 className="mb-4 text-lg font-semibold">
          Завдання 2: Додати новий рецепт
        </h3>

        <div className="mb-4 grid gap-4 md:grid-cols-2">
          <div>
            <label
              htmlFor="recipe-name"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Назва страви:
            </label>
            <input
              id="recipe-name"
              type="text"
              value={newRecipeName}
              onChange={(e) => setNewRecipeName(e.target.value)}
              placeholder="Введіть назву страви..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="recipe-author"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Автор рецепта:
            </label>
            <input
              id="recipe-author"
              type="text"
              value={newRecipeAuthor}
              onChange={(e) => setNewRecipeAuthor(e.target.value)}
              placeholder="Введіть ім'я автора..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleAddRecipe}
          disabled={!newRecipeName.trim() || !newRecipeAuthor.trim()}
          className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          Додати рецепт
        </button>
      </Block>

      {/* Управление списком */}
      <Block className="block">
        <h3 className="mb-4 text-lg font-semibold">
          Завдання 3-4: Сортування та перемішування
        </h3>

        <div className="mb-4 flex flex-wrap gap-3">
          <button
            onClick={handleSortByName}
            className="rounded-md bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600"
          >
            Сортувати за назвою (A–Я)
          </button>

          <button
            onClick={handleShuffleRecipes}
            className="rounded-md bg-purple-500 px-4 py-2 text-white transition-colors hover:bg-purple-600"
          >
            Перемішати список
          </button>
        </div>

        <div className="text-sm text-gray-600">
          Усього рецептів: {recipes.length}
        </div>
      </Block>

      {/* Список рецептов */}
      <Block className="block">
        <h3 className="mb-4 text-lg font-semibold">
          Завдання 1: Список рецептів
        </h3>

        {recipes.length === 0 ? (
          <div className="rounded-lg bg-gray-50 py-8 text-center text-gray-500">
            <div className="mb-2 text-lg font-medium">🍳 Немає рецептів</div>
            <p>Додайте свій перший рецепт вище!</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {recipes.map((recipe) => (
              <li
                key={recipe.id} // Стабильный key через ID
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
              >
                <div className="flex-1">
                  <span className="font-medium text-gray-900">
                    {recipe.name}
                  </span>
                  <span className="text-gray-500"> — </span>
                  <span className="text-gray-600">{recipe.author}</span>
                </div>

                <button
                  onClick={() => handleDeleteRecipe(recipe.id)}
                  className="ml-4 rounded-md bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
                >
                  Видалити
                </button>
              </li>
            ))}
          </ul>
        )}
      </Block>
    </div>
  );
}
