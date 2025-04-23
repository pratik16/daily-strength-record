
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GradientHeader({ title, subtitle }) {
  return (
    <LinearGradient
      colors={["#33C3F0", "#D3E4FD"]}
      start={{ x: 0, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.sub}>{subtitle}</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 25,
    alignItems: "center",
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#8B5CF6",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
  },
  title: {
    color: "#1A1F2C",
    fontWeight: "bold",
    fontSize: 27,
    letterSpacing: 1,
    marginBottom: 8,
  },
  sub: {
    color: "#7E69AB",
    fontSize: 16,
    fontWeight: "500",
  },
});
