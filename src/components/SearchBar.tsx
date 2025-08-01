import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // ShadCN Select

interface SearchBarProps {
  onSearch: (term: string, type: 'name' | 'ingredient' | 'category') => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<'name' | 'ingredient' | 'category'>('name');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm, searchType);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center w-full max-w-2xl mx-auto mb-8">
      {/* Dropdown for search type */}
      <Select value={searchType} onValueChange={(value: 'name' | 'ingredient' | 'category') => setSearchType(value)}>
        <SelectTrigger className="w-full md:w-[180px] bg-secondary text-secondary-foreground border-border focus:ring-primary">
          <SelectValue placeholder="Search by..." />
        </SelectTrigger>
        <SelectContent className="bg-popover text-popover-foreground border-border">
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="ingredient">Ingredient</SelectItem>
          <SelectItem value="category">Category</SelectItem>
        </SelectContent>
      </Select>

      <Input
        type="text"
        placeholder={`Search by ${searchType}...`}
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow bg-input border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary"
      />
      <Button onClick={handleSearch} className="bg-primary hover:bg-primary-600 text-primary-foreground">
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
