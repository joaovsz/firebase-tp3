import React, { createContext, useContext, useState, useEffect } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MD3DarkTheme, DefaultTheme } from "react-native-paper";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  paperTheme: typeof MD3DarkTheme | typeof DefaultTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("system");
  const [paperTheme, setPaperTheme] = useState(DefaultTheme);

  useEffect(() => {
    // Carrega a preferência de tema salva
    const loadTheme = async () => {
      const savedTheme = (await AsyncStorage.getItem("theme")) as ThemeType;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };
    loadTheme();
  }, []);

  useEffect(() => {
    const getTheme = () => {
      if (theme === "system") {
        return Appearance.getColorScheme() === "dark"
          ? MD3DarkTheme
          : DefaultTheme;
      }
      return theme === "dark" ? MD3DarkTheme : DefaultTheme;
    };
    setPaperTheme(getTheme());
  }, [theme]);

  const handleSetTheme = async (selectedTheme: ThemeType) => {
    setTheme(selectedTheme);
    await AsyncStorage.setItem("theme", selectedTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme: handleSetTheme, paperTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
