
import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import GradientHeader from "../components/GradientHeader";
import { useRecords } from "../hooks/useRecords";

function formatDate(iso: string) {
  const date = new Date(iso);
  // formats like: 23 Apr 2025, 09:30
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ListScreen() {
  const { getPaginatedRecords, totalPages, refresh } = useRecords();
  const [page, setPage] = useState(0);

  const data = getPaginatedRecords(page);

  return (
    <View style={{ flex: 1 }}>
      <GradientHeader title="Records List" subtitle={`Page ${page + 1} of ${totalPages()}`} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.date}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={{ color: "#8E9196", marginTop: 80, textAlign: "center" }}>No records yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardDate}>{formatDate(item.date)}</Text>
            <View style={styles.chipsRow}>
              <View style={styles.chip}><Text style={styles.chipText}>PushUP: {item.pushup}</Text></View>
              <View style={styles.chip}><Text style={styles.chipText}>Indian: {item.indianPushup}</Text></View>
              <View style={styles.chip}><Text style={styles.chipText}>Seatups: {item.seatup}</Text></View>
            </View>
          </View>
        )}
      />
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={[styles.pageBtn, page === 0 && { opacity: 0.5 }]}
        >
          <Text style={styles.pageBtnText}>{"< Prev"}</Text>
        </TouchableOpacity>
        <Text style={styles.pageNumber}>{page + 1}</Text>
        <TouchableOpacity
          onPress={() => setPage((p) => (p + 1 < totalPages() ? p + 1 : p))}
          disabled={page + 1 >= totalPages()}
          style={[styles.pageBtn, page + 1 >= totalPages() && { opacity: 0.5 }]}
        >
          <Text style={styles.pageBtnText}>{"Next >"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    paddingBottom: 90,
    paddingTop: 0,
    minHeight: 80
  },
  card: {
    backgroundColor: "#D3E4FD",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#333",
    shadowOpacity: 0.09,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardDate: {
    fontWeight: "bold",
    color: "#403E43",
    fontSize: 15,
    marginBottom: 7,
    letterSpacing: 0.3,
  },
  chipsRow: {
    flexDirection: "row",
    gap: 10,
  },
  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 10,
    marginRight: 8,
    marginTop: 4,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  chipText: {
    color: "#1EAEDB",
    fontWeight: "bold",
    fontSize: 14,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },
  pageBtn: {
    backgroundColor: "#1EAEDB",
    borderRadius: 13,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pageBtnText: {
    color: "#fff",
    fontWeight: "bold"
  },
  pageNumber: {
    fontWeight: "bold",
    color: "#403E43",
    fontSize: 17,
    paddingHorizontal: 10
  },
});
