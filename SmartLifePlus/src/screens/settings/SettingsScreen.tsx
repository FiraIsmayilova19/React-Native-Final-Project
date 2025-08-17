import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useThemeCtx } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useThemeCtx();
  const { logout } = useUser();

  const gradientColors = theme === 'dark'
    ? ['#0f2027', '#203a43']
    : ['#1e3c72', '#2a5298'];

  const cardBg = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)';
  const toggleBg = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.25)';

  return (
    <LinearGradient colors={['#df41caff', '#2a5298']}  style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Ayarlar</Text>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Ionicons name="color-palette-outline" size={24} color="#fff" />
          <Text style={styles.cardText}>Tema</Text>
          <Pressable onPress={toggleTheme} style={({ pressed }) => [{ backgroundColor: toggleBg, ...styles.toggleBtn }, pressed && { opacity: 0.7 }]}>
            <Text style={styles.toggleTxt}>{theme === 'dark' ? 'Light' : 'Dark'}</Text>
          </Pressable>
        </View>

        <Pressable onPress={logout} style={({ pressed }) => [styles.logoutBtn, pressed && { opacity: 0.8 }]}>
          <LinearGradient colors={['#1442dbff', '#2baaffff']} style={styles.logoutGradient}>
            <Ionicons name="exit-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.logoutTxt}>Çıxış</Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { color: '#fff', fontSize: 26, fontWeight: '700', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  cardText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  toggleBtn: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  toggleTxt: { color: '#fff', fontWeight: '600' },
  logoutBtn: { borderRadius: 18, overflow: 'hidden' },
  logoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 18,
  },
  logoutTxt: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
