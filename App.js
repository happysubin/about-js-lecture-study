import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Loading from "./Loading";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.blueView}>
        <Text>Hello World!!!my name is jj!</Text>
      </View>
      <View style={styles.greenView}>
        <Text>Hello World!!!my name is jj!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  blueView: {
    flex: 2,
    backgroundColor: "blue",
  },
  greenView: {
    flex: 1,
    backgroundColor: "green",
  },
});
