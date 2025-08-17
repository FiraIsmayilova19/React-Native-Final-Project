import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { insertTask } from '../../db/database';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function AddTaskScreen() {
  const nav = useNavigation<any>();
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const save = async () => {
    if (!title.trim()) return;
    await insertTask(title, deadline || undefined);
    nav.goBack();
  };

  return (
    <LinearGradient colors={['#ca309cff', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Yeni Tapşırıq</Text>

        <View style={styles.inputCard}>
          <Ionicons name="pencil-outline" size={24} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput
            placeholder="Başlıq"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
          />
        </View>

        <View style={styles.inputCard}>
          <Ionicons name="calendar-outline" size={24} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput
            placeholder="YYYY-MM-DD"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={deadline}
            onChangeText={setDeadline}
            style={styles.input}
          />
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
  btn: {
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 10,
  },
  btnGradient: {
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
