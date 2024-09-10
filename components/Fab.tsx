import * as React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

const FabButton = () => {
  return <FAB icon="logout" style={styles.fab} onPress={() => {}} />;
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
