import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-card shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary hover:text-primary-600 transition-colors">
          Foodie Finder
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-foreground hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/favorites" className="text-foreground hover:text-primary transition-colors">
                Favorites
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
