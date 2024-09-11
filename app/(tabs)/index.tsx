import AppBar from "@/components/AppBar/AppBar";
import CustomTable from "@/components/DataTable/DataTable";
import FabButton from "@/components/Fab";
import SwitchComponent from "@/components/Switch/Switch";
import { Text, View } from "react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Title } from "react-native-paper";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Componentes solicitados:</Text>
      </View>
      <AppBar />
      <FabButton />
      <SwitchComponent />
      <View style={styles.section}>
        <Title style={styles.componentTitle}>DataTable</Title>
        <CustomTable />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    minHeight: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  componentTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});
