const FAVORITES_KEY = 'foodieFinderFavorites';
/**
 * @returns
 */
export const getFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error getting favorites from local storage:", error);
    return [];
  }
};

/**
 * @param mealId
 * @returns 
 */
export const addFavorite = (mealId: string): string[] => {
  const favorites = getFavorites();
  if (!favorites.includes(mealId)) {
    const updatedFavorites = [...favorites, mealId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  }
  return favorites; 
};

/**
 
 * @param mealId 
 * @returns 
 */
export const removeFavorite = (mealId: string): string[] => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter(id => id !== mealId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  return updatedFavorites;
};

/**
 * @param mealId 
 * @returns 
 */
export const isFavorite = (mealId: string): boolean => {
  const favorites = getFavorites();
  return favorites.includes(mealId);
};
