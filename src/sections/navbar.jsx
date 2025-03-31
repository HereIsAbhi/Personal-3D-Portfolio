import { useState } from 'react';
import { navLinks } from '../constants/index.js';
import { useTheme } from '../context/ThemeContext';

const NavItems = () => {
    return(
  <ul className="nav-ul">
    {navLinks.map((link) => (
      <li key={link.id} className="nav-li">
        <a href={link.href} className="nav-li_a" onClick={()=>{}}>
          {link.name}
        </a>
      </li>
    ))}
  </ul>
)
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleMenu = () => setIsOpen((prevIsOpen) => !prevIsOpen);
//   const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDarkMode ? 'bg-black/90' : 'bg-white/90'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className={`font-bold text-xl transition-colors ${isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
            Abhinav
          </a>

          <div className="flex items-center gap-4">
            <nav className="sm:flex hidden">
              <NavItems />
            </nav>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'}`}
              aria-label="Toggle theme">
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            <button
              onClick={toggleMenu}
              className={`focus:outline-none sm:hidden flex ${isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}
              aria-label="Toggle menu">
              <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'} ${isDarkMode ? 'bg-black-200' : 'bg-white'}`}>
        <nav className="p-5">
          <NavItems />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;