
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Record = {
  date: string;
  pushup: number;
  indianPushup: number;
  seatup: number;
};

const STORAGE_KEY = "strength-records";
const PAGE_SIZE = 10;

let inMemoryRecords: Record[] = [];

export function useRecords() {
  const [records, setRecords] = useState<Record[]>([]);

  // Load records on mount.
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const arr = JSON.parse(raw);
        setRecords(arr);
        inMemoryRecords = arr;
      }
    });
  }, []);

  // Add new record and update both memory and AsyncStorage.
  const addRecord = useCallback(async (rec: Record) => {
    const newRecords = [rec, ...records];
    setRecords(newRecords);
    inMemoryRecords = newRecords;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRecords));
  }, [records]);

  // For page listing: 0-based page index.
  const getPaginatedRecords = (page: number) => {
    return records.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  };
  const totalPages = () => Math.ceil(records.length / PAGE_SIZE);

  // For screens to refresh upon save (if needed elsewhere)
  const refresh = async () => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      setRecords(arr);
      inMemoryRecords = arr;
    }
  };

  return { records, addRecord, getPaginatedRecords, totalPages, refresh };
}
