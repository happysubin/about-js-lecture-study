import react from "react";
import { StyleSheet, Text, View } from "react-native"; //이것들을 꼭 import 해야해!!!

export default function Loading() {
  return (
    <View style={styles.container}>
      <Text>Getting the nice Weather!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
