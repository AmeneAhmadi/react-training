import { useState } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); //theme
  //change theme
  const toggleTheme = () => {
    setIsDarkMode((prev) => (prev = !prev));
  };
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeContextProvider.propTypes = {
  children: PropTypes.node,
};
