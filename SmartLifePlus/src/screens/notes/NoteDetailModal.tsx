import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getNotes, Note } from '../../storage/notes';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function NoteDetailModal() {
  const route = useRoute<any>();
  const id = route.params?.id as string;
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    (async () => {
      const list = await getNotes();
      setNote(list.find(n => n.id === id) || null);
    })();
  }, [id]);

  if (!note)
    return (
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
        <Text style={{ color: '#fff' }}>Tapılmadı</Text>
      </LinearGradient>
    );

  return (
    <LinearGradient colors={['#df41caff', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.card}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.content}>{note.content}</Text>

          {note.remindAt ? (
            <Text style={styles.date}>
              Xatırlatma: {new Date(note.remindAt).toLocaleString()}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    padding: 20,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 12 },
  content: { fontSize: 16, color: '#fff', lineHeight: 22 },
  date: { marginTop: 12, fontSize: 14, color: '#eee', fontStyle: 'italic' },
});
