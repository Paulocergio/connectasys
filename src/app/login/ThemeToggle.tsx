import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export function ThemeToggle({ darkMode, setDarkMode }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-5 right-5 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-10"
      aria-label="Toggle theme"
    >
      {darkMode ? 
        <Sun className="text-yellow-500" size={20} /> : 
        <Moon className="text-indigo-700" size={20} />
      }
    </button>
  );
}