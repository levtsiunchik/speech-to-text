import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useRecognize } from "../hooks/useRecognize";

type Props = Pick<ReturnType<typeof useRecognize>, "error">;

export const RecognizeError = React.memo<Props>(({ error }) => {
  if (!error) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error: {error}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: "#fee",
    borderRadius: 4,
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
  },
  text: {
    color: "#c00",
    fontWeight: "bold",
  },
});
