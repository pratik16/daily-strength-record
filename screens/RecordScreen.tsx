
import React, { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from "react-native";
import RecordInput from "../components/RecordInput";
import GradientHeader from "../components/GradientHeader";
import { useRecords } from "../hooks/useRecords";

export default function RecordScreen() {
  const [pushup, setPushup] = useState("");
  const [indianPushup, setIndianPushup] = useState("");
  const [seatup, setSeatup] = useState("");
  const [saving, setSaving] = useState(false);
  const { addRecord } = useRecords();

  const onSave = async () => {
    if (!pushup || !indianPushup || !seatup) {
      Alert.alert("Missing data", "Please fill all fields with numbers.");
      return;
    }
    setSaving(true);
    const now = new Date();
    await addRecord({
      date: now.toISOString(),
      pushup: Number(pushup),
      indianPushup: Number(indianPushup),
      seatup: Number(seatup),
    });
    setSaving(false);
    setPushup("");
    setIndianPushup("");
    setSeatup("");
    Alert.alert("Saved", "Your daily record has been saved!");
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <GradientHeader title="Daily Strength" subtitle="Record your workout" />
      <View style={styles.container}>
        <RecordInput
          label="PushUP"
          value={pushup}
          onChangeText={setPushup}
          keyboardType="number-pad"
        />
        <RecordInput
          label="Indian Pushup"
          value={indianPushup}
          onChangeText={setIndianPushup}
          keyboardType="number-pad"
        />
        <RecordInput
          label="Seatups"
          value={seatup}
          onChangeText={setSeatup}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={[styles.saveBtn, saving && { opacity: 0.7 }]}
          disabled={saving}
          onPress={onSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveText}>{saving ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center"
  },
  saveBtn: {
    marginTop: 32,
    backgroundColor: "#33C3F0",
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#33C3F0",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.24,
    elevation: 3,
  },
  saveText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1
  },
});
