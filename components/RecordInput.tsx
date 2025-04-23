
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function RecordInput({ label, value, onChangeText, keyboardType }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={styles.input}
        placeholder="0"
        placeholderTextColor="#8E9196"
        maxLength={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 22,
  },
  label: {
    marginBottom: 3,
    fontWeight: "bold",
    color: "#6E59A5",
    fontSize: 17,
    letterSpacing: 0.2,
  },
  input: {
    backgroundColor: "#D3E4FD",
    borderRadius: 13,
    paddingVertical: 11,
    paddingHorizontal: 18,
    fontSize: 17,
    fontWeight: "bold",
    color: "#403E43",
    borderWidth: 1.5,
    borderColor: "#9b87f5",
  },
});
