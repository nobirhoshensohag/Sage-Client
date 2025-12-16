import React from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const COLORS = {
    darkGreen: "#1A2F23",
    sage: "#4F6F52",
    mist: "#F3F5F0",
    gold: "#D4C5A8",
    white: "#FFFFFF",
  };

  const themeInfo = {
    COLORS,
  };
  return <ThemeContext value={themeInfo}>{children}</ThemeContext>;
};

export default ThemeProvider;