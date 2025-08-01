import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Meal } from '@/services/mealApi';
import FavoriteToggle from './FavoriteToggle'; // Import the new FavoriteToggle component

interface MealCardProps {
  meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <Card className="relative w-full h-full flex flex-col justify-between overflow-hidden shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
      {/* Favorite Toggle Button */}
      <FavoriteToggle mealId={meal.idMeal} />

      <Link to={`/meal/${meal.idMeal}`} className="block h-full"> {/* Link wraps the entire card content except for the toggle */}
        <CardHeader className="p-0">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-48 object-cover rounded-t-lg"
            loading="lazy"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-semibold mb-2 line-clamp-2 text-foreground">
            {meal.strMeal}
          </CardTitle>
          {meal.strArea && meal.strCategory && (
            <CardDescription className="text-muted-foreground text-sm">
              {meal.strArea} | {meal.strCategory}
            </CardDescription>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default MealCard;
