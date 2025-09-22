import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const RecognizeTextScreen: React.FC = () => {
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleRecognizeText = async () => {};

  return (
    <View style={styles.container}>
      <Button
        title={loading ? "Recognizing..." : "Recognize Text"}
        onPress={handleRecognizeText}
        disabled={loading}
      />
      <View style={styles.outputContainer}>
        <Text style={styles.outputLabel}>Output:</Text>
        <Text style={styles.outputText}>{recognizedText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  outputContainer: { marginTop: 24, width: "100%", alignItems: "center" },
  outputLabel: { fontWeight: "bold", marginBottom: 8 },
  outputText: { fontSize: 16, color: "#333" },
});

export default RecognizeTextScreen;
