import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import MealCard from '@/components/MealCard';
import { searchMealsByName, searchMealsByIngredient, searchMealsByCategory, getRandomMeal, listCategories, Meal } from '@/services/mealApi';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<{ strCategory: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await listCategories();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
    const fetchRandomMeals = async () => {
      setLoading(true);
      setError(null);
      try {
        const randomMealsPromises = Array.from({ length: 8 }).map(() => getRandomMeal());
        const results = await Promise.all(randomMealsPromises);
        const validMeals: Meal[] = results.filter((meal): meal is Meal => meal !== null);
        setMeals(validMeals);
      } catch (err) {
        setError('Failed to load random meals. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomMeals();
  }, []);

  const handleSearch = async (term: string, type: 'name' | 'ingredient' | 'category') => {
    setLoading(true);
    setError(null);
    setMeals([]); 

    try {
      let data: Meal[] | null;
      if (type === 'name') {
        data = await searchMealsByName(term);
      } else if (type === 'ingredient') {
        data = await searchMealsByIngredient(term);
      } else if (type === 'category') {
        data = await searchMealsByCategory(term);
      } else {
        data = null; 
      }
      setMeals(data || []); 
    } catch (err) {
      setError('Failed to fetch meals. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomMeal = async () => {
    setLoading(true);
    setError(null);
    setMeals([]);
    try {
      const meal = await getRandomMeal();
      if (meal) {
        setMeals([meal]);
      } else {
        setMeals([]);
      }
    } catch (err) {
      setError('Failed to fetch a random meal. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = async (categoryName: string) => {
    handleSearch(categoryName, 'category');
  };

  return (
    <div className="space-y-8 py-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">
        Discover Delicious Meals!
      </h1>

      <SearchBar onSearch={handleSearch} />

      <div className="flex justify-center mb-8">
        <Button onClick={handleRandomMeal} className="bg-primary hover:bg-primary-600 text-primary-foreground">
          Surprise Me! (Random Meal)
        </Button>
      </div>
      <h2 className="text-2xl font-semibold text-center text-foreground mb-4">Browse Categories</h2>
      <ScrollArea className="w-full whitespace-nowrap rounded-md border border-border p-4 bg-card mb-8">
        <div className="flex w-max space-x-4 p-4">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <Button
                key={cat.strCategory}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground border-border text-foreground transition-colors"
                onClick={() => handleCategoryFilter(cat.strCategory)}
              >
                {cat.strCategory}
              </Button>
            ))
          ) : (
            Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32 rounded-md bg-muted" />
            ))
          )}
        </div>
        <ScrollBar orientation="horizontal" className="bg-muted" />
      </ScrollArea>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg bg-muted" />
          ))}
        </div>
      )}

      {error && (
        <p className="text-center text-destructive text-xl mt-8">{error}</p>
      )}

      {!loading && !error && meals.length === 0 && (
        <p className="text-center text-muted-foreground text-xl mt-8">
          No meals found. Try a different search!
        </p>
      )}

      {!loading && !error && meals.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
