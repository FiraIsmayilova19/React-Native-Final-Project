import AsyncStorage from '@react-native-async-storage/async-storage';
import { NOTES_KEY } from './keys';

export interface Note { id: string; title: string; content: string; remindAt?: string | null }

export async function getNotes(): Promise<Note[]> {
  const raw = await AsyncStorage.getItem(NOTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveNotes(list: Note[]) {
  await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(list));
}
