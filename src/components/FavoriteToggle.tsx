// src/components/FavoriteToggle.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { addFavorite, removeFavorite, isFavorite } from '@/services/localStorageService';

interface FavoriteToggleProps {
  mealId: string;
  onToggle?: (isNowFavorite: boolean) => void; // Optional callback for parent components
}

const FavoriteToggle: React.FC<FavoriteToggleProps> = ({ mealId, onToggle }) => {
  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  useEffect(() => {
    // Check initial favorite status when component mounts or mealId changes
    setIsFavorited(isFavorite(mealId));
  }, [mealId]);

  const handleToggleFavorite = () => {
    if (isFavorited) {
      removeFavorite(mealId);
      setIsFavorited(false);
      onToggle?.(false); // Call optional callback
    } else {
      addFavorite(mealId);
      setIsFavorited(true);
      onToggle?.(true); // Call optional callback
    }
  };

  return (
    <Button
      variant="ghost" // Use ghost variant for a subtle button
      size="icon" // Make it a small, icon-only button
      onClick={handleToggleFavorite}
      className={`absolute top-2 right-2 rounded-full p-1 transition-colors duration-200
        ${isFavorited ? 'text-primary hover:text-primary-600' : 'text-muted-foreground hover:text-primary-foreground hover:bg-primary-50'}
      `}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      {/* Using a simple heart emoji or an SVG icon */}
      <span className="text-xl">
        {isFavorited ? '❤️' : '🤍'}
      </span>
    </Button>
  );
};

export default FavoriteToggle;
