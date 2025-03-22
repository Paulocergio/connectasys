// ThemeToggle.jsx
export function ThemeToggle({ darkMode, setDarkMode }) {
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
  
  // AlertMessage.jsx
  export function AlertMessage({ type, message }) {
    if (!message) return null;
    
    const isError = type === 'error';
    const bgColor = isError ? 'bg-red-50 dark:bg-red-900/30' : 'bg-green-50 dark:bg-green-900/30';
    const borderColor = isError ? 'border-red-200 dark:border-red-800' : 'border-green-200 dark:border-green-800';
    const textColor = isError ? 'text-red-600 dark:text-red-300' : 'text-green-600 dark:text-green-300';
    const Icon = isError ? () => <div className="mr-2 flex-shrink-0">⚠️</div> : CheckCircle;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`mb-4 p-3 ${bgColor} border ${borderColor} ${textColor} rounded-lg text-sm flex items-center`}
      >
        {isError ? <div className="mr-2 flex-shrink-0">⚠️</div> : <CheckCircle className="mr-2 h-4 w-4" />}
        {message}
      </motion.div>
    );
  }