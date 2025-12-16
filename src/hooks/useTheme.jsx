import React, { use } from "react";
import { ThemeContext } from "../contexts/AuthContext/ThemeContext/ThemeContext";

const useTheme = () => {
  const themeInfo = use(ThemeContext);
  return themeInfo;
};

export default useTheme;