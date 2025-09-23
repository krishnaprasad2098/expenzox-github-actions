import React, { useContext, createContext, useState, useEffect } from 'react';

// Create the context
const ThemeContext = createContext();

// Provider component
export const ThemeContextProvider = ({ children }) => {
  // Persist theme preference in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Check for system preference if no saved theme
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Correct theme determination
  const theme = isDarkMode ? 'dark' : 'light';

  const toggleTheme = () => {
    console.log("clicked on toggle mode.")
    setIsDarkMode((prev) => !prev);
  };

  // Effect to update document theme and localStorage
  useEffect(() => {
    // For Tailwind 4, we can add the class directly to the html element
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for using theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  // Throw an error if used outside of provider
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  
  return context;
};