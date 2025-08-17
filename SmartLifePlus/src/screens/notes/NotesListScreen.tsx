import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { getNotes, saveNotes, Note } from '../../storage/notes';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function NotesListScreen() {
  const nav = useNavigation<any>();
  const [items, setItems] = useState<Note[]>([]);

  const load = async () => {
    const data = await getNotes();
    setItems(data);
  };

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  const remove = async (id: string) => {
    const next = items.filter(n => n.id !== id);
    await saveNotes(next);
    setItems(next);
  };

  return (
    <LinearGradient colors={['#df41caff', '#2a5298']} style={styles.container}>
      <View style={{ padding: 20 }}>
        <Pressable onPress={() => nav.navigate('AddNote')} style={styles.addBtn}>
          <Ionicons name="add-circle-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
          <Text style={styles.addTxt}>Yeni Qeyd</Text>
        </Pressable>

        <FlatList
          data={items}
          keyExtractor={(it) => it.id}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.noteCard}>
              <Pressable onPress={() => nav.navigate('NoteDetail', { id: item.id })} style={{ flex: 1 }}>
                <Text style={styles.title}>{item.title}</Text>
              </Pressable>
              <Pressable onPress={() => remove(item.id)} style={styles.del}>
                <Ionicons name="trash-outline" size={20} color="#fff" />
              </Pressable>
            </LinearGradient>
          )}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    marginBottom: 16,
  },
  addTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
  noteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  title: { fontSize: 16, fontWeight: '700', color: '#fff' },
  del: { padding: 6 },
});
