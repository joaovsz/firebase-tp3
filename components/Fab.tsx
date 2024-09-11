import { useAuth } from "@/app/context/AuthContext";
import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const FabButton = () => {
  const { logout } = useAuth();
  return (
    <FAB
      icon="logout"
      style={styles.fab}
      onPress={async () => await logout()}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 0,
    right: 16,
    bottom: 16,
  },
});

export default FabButton;
