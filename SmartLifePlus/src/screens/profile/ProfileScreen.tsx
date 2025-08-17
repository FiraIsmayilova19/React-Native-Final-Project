import React, { useEffect, useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '../../context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, saveUser } = useUser();
  const [firstName, setFirst] = useState('');
  const [lastName, setLast] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('🙂');

  useEffect(() => {
    if (user) {
      setFirst(user.firstName);
      setLast(user.lastName);
      setBio(user.bio || '');
      setAvatar(user.avatar || '🙂');
    }
  }, [user]);

  const save = async () => {
    await saveUser({ firstName, lastName, bio, avatar });
  };

  return (
    <LinearGradient colors={['#df41caff', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Profil</Text>

        <View style={styles.avatarCard}>
          <Text style={styles.avatar}>{avatar}</Text>
        </View>

        <View style={styles.inputCard}>
          <Ionicons name="person-outline" size={22} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput
            placeholder="Ad"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={firstName}
            onChangeText={setFirst}
            style={styles.input}
          />
        </View>

        <View style={styles.inputCard}>
          <Ionicons name="person-outline" size={22} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput
            placeholder="Soyad"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={lastName}
            onChangeText={setLast}
            style={styles.input}
          />
        </View>

        <View style={styles.inputCard}>
          <Ionicons name="information-circle-outline" size={22} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput
            placeholder="Bio"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={bio}
            onChangeText={setBio}
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
            multiline
          />
        </View>

        <View style={styles.inputCard}>
          <Ionicons name="happy-outline" size={22} color="#fff" style={{ marginBottom: 6 }} />
          <TextInput
            placeholder="Avatar emoji (🙂)"
            placeholderTextColor="rgba(255,255,255,0.7)"
            value={avatar}
            onChangeText={setAvatar}
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
  avatarCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: { fontSize: 48 },
  inputCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.4)',
    paddingVertical: 6,
  },
  btn: { borderRadius: 18, overflow: 'hidden', marginTop: 10 },
  btnGradient: { paddingVertical: 14, justifyContent: 'center', alignItems: 'center' },
  btnTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
