import React from "react";
import { View, Text } from "react-native";
import { RadioButton, List } from "react-native-paper";
import { useTheme } from "../context/ThemeProvider";

const SettingsScreen = () => {
  const { theme, setTheme } = useTheme();

  return (
    <View style={{ padding: 20 }}>
      <List.Subheader>Temas</List.Subheader>
      <RadioButton.Group
        onValueChange={(value) =>
          setTheme(value as "light" | "dark" | "system")
        }
        value={theme}
      >
        <RadioButton.Item
          label="Automático (Padrão do sistema)"
          value="system"
        />
        <RadioButton.Item label="Claro" value="light" />
        <RadioButton.Item label="Escuro" value="dark" />
      </RadioButton.Group>
    </View>
  );
};

export default SettingsScreen;
