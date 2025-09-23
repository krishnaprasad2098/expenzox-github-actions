import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { IoMdMoon, IoMdSunny } from "react-icons/io";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <div className="w-11 h-6 bg-purple-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-purple-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-purple-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-purple-600">
        <span className="absolute left-1 top-1 text-xs text-white dark:opacity-0">
          <IoMdSunny />
        </span>
        <span className="absolute right-1 top-1 text-xs text-white opacity-0 dark:opacity-100">
          <IoMdMoon />
        </span>
      </div>
    </label>
  );
};

export default ThemeToggler;
