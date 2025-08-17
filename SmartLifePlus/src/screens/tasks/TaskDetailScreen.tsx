import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { getTaskById, updateTask } from '../../db/database';
import { useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TaskDetailScreen() {
  const route = useRoute<any>();
  const nav = useNavigation<any>();
  const id = route.params?.id as number;
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    (async () => {
      const t = await getTaskById(id);
      if (t) { setTitle(t.title); setDeadline(t.deadline ?? ''); setCompleted(!!t.completed); }
    })();
  }, [id]);

  const save = async () => {
    await updateTask(id, title, deadline || undefined, completed);
    nav.goBack();
  };

  return (
    <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Tapşırıq Detalları</Text>

        <View style={styles.inputCard}>
          <Ionicons name="pencil-outline" size={24} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput value={title} onChangeText={setTitle} style={styles.input} placeholder="Başlıq" placeholderTextColor="rgba(255,255,255,0.7)" />
        </View>

        <View style={styles.inputCard}>
          <Ionicons name="calendar-outline" size={24} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput value={deadline} onChangeText={setDeadline} style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor="rgba(255,255,255,0.7)" />
        </View>

        <View style={styles.switchRow}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>Tamamlandı</Text>
          <Switch value={completed} onValueChange={setCompleted} />
        </View>

        <Pressable onPress={save} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.8 }]}>
          <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.btnGradient}>
            <Text style={styles.btnTxt}>Yadda saxla</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { color: '#fff', fontSize: 26, fontWeight: '700', marginBottom: 20 },
  inputCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 6,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  btn: { borderRadius: 18, overflow: 'hidden', marginTop: 10 },
  btnGradient: { paddingVertical: 14, justifyContent: 'center', alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
