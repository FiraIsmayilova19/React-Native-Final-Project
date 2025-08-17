import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Switch, ScrollView } from 'react-native';
import { getTasks, toggleComplete, deleteTask } from '../../db/database';
import { useNavigation } from '@react-navigation/native';
import { initDatabase } from '../../db/database';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TasksListScreen() {
  const nav = useNavigation<any>();
  const [filter, setFilter] = useState<'all' | 'done' | 'todo'>('all');
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    const data = await getTasks(filter);
    setItems(data);
  };

  useEffect(() => { initDatabase(); load(); }, []);
  useEffect(() => { load(); }, [filter]);

  return (
    <LinearGradient colors={['#ff49e7ff', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.toolbar}>
          <Pressable onPress={() => nav.navigate('AddTask')} style={styles.addBtn}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" style={{ marginRight: 6 }} />
            <Text style={styles.addTxt}>Yeni Tapşırıq</Text>
          </Pressable>

          <View style={styles.filters}>
            <Pressable onPress={() => setFilter('all')}><Text style={[styles.f, filter==='all' && styles.fActive]}>Hamısı</Text></Pressable>
            <Pressable onPress={() => setFilter('todo')}><Text style={[styles.f, filter==='todo' && styles.fActive]}>Aktiv</Text></Pressable>
            <Pressable onPress={() => setFilter('done')}><Text style={[styles.f, filter==='done' && styles.fActive]}>Tamam</Text></Pressable>
          </View>
        </View>

        <FlatList
          data={items}
          keyExtractor={(it) => String(it.id)}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          renderItem={({ item }) => (
            <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.taskCard}>
              <Pressable onPress={() => nav.navigate('TaskDetail', { id: item.id })} style={{ flex: 1 }}>
                <Text style={[styles.title, item.completed && styles.done]}>{item.title}</Text>
                {item.deadline && <Text style={styles.deadline}>Son tarix: {item.deadline}</Text>}
              </Pressable>
              <Switch value={!!item.completed} onValueChange={async (v) => { await toggleComplete(item.id, v); load(); }} />
              <Pressable onPress={async () => { await deleteTask(item.id); load(); }} style={styles.del}>
                <Ionicons name="trash-outline" size={20} color="#fff" />
              </Pressable>
            </LinearGradient>
          )}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  addTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
  filters: { flexDirection: 'row', gap: 12 },
  f: { opacity: 0.7, color: '#fff' }, fActive: { opacity: 1, fontWeight: '700', textDecorationLine: 'underline' },
  taskCard: {
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
  done: { textDecorationLine: 'line-through', opacity: 0.6 },
  deadline: { fontSize: 12, opacity: 0.8, color: '#fff', marginTop: 4 },
  del: { padding: 6 },
});
