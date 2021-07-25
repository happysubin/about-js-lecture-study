import React from "react";
import { StyleSheet, Text, View } from "react-native"; //이것들을 꼭 import 해야해!!!

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Getting the nice Weather!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 40,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA",
    //RN에만 있는 특이한 스타일 값
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30,
  },
});
