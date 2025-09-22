import { deleteCreds, getCreds, saveCreds } from "@/src/shared/lib/creds";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const SettingsScreen: React.FC = () => {
  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const [savedId, setSavedId] = useState<string>("");
  const [savedToken, setSavedToken] = useState<string>("");

  useEffect(() => {
    (async () => {
      const { id, token } = await getCreds();
      setSavedId(id ?? "");
      setSavedToken(token ?? "");
      if (id) setId(id);
      if (token) setToken(token);
    })();
  }, []);

  const isDirty = useMemo(
    () => id.trim() !== savedId.trim() || token.trim() !== savedToken.trim(),
    [id, token, savedId, savedToken]
  );

  const hasSaved = useMemo(
    () => !!savedId && !!savedToken,
    [savedId, savedToken]
  );

  const onSaveOrUpdate = async () => {
    await saveCreds(id.trim(), token.trim());
    setSavedId(id.trim());
    setSavedToken(token.trim());
    Alert.alert(
      hasSaved ? "Updated" : "Saved",
      "Credentials stored securely on this device"
    );
  };

  const onDelete = async () => {
    await deleteCreds();
    setSavedId("");
    setSavedToken("");
    setId("");
    setToken("");
    Alert.alert("Deleted", "Credentials removed");
  };

  const primaryLabel = hasSaved ? "Update" : "Save";
  const primaryDisabled = !id.trim() || !token.trim() || !isDirty;

  return (
    <View style={s.wrap}>
      <Text style={s.label}>Cloudflare Account ID</Text>
      <TextInput
        style={s.input}
        value={id}
        onChangeText={setId}
        autoCapitalize="none"
        placeholder="Enter Account ID"
      />

      <Text style={s.label}>Cloudflare API Token</Text>
      <TextInput
        style={s.input}
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        secureTextEntry
        placeholder="Enter API Token"
      />

      <Pressable
        style={[s.button, s.save, primaryDisabled && s.disabled]}
        onPress={onSaveOrUpdate}
        disabled={primaryDisabled}
      >
        <Text style={s.buttonText}>{primaryLabel}</Text>
      </Pressable>

      <Pressable
        style={[s.button, s.delete, !hasSaved && s.disabled]}
        onPress={onDelete}
        disabled={!hasSaved}
      >
        <Text style={s.buttonText}>Delete</Text>
      </Pressable>

      <Text style={s.hint}>
        {hasSaved
          ? isDirty
            ? "Changes not saved"
            : "Credentials are up to date"
          : "No credentials saved"}
      </Text>
    </View>
  );
};

const s = StyleSheet.create({
  wrap: { flex: 1, padding: 16, gap: 16, backgroundColor: "white" },
  label: { fontWeight: "600", color: "#444" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fafafa",
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  save: { backgroundColor: "#007AFF" },
  delete: { backgroundColor: "#FF3B30" },
  disabled: { opacity: 0.5 },
  buttonText: { color: "white", fontWeight: "600", fontSize: 16 },
  hint: { textAlign: "center", color: "#666", marginTop: 4 },
});

export default SettingsScreen;
