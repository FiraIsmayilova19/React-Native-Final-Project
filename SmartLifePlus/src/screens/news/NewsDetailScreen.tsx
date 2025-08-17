import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useThemeCtx } from '../../context/ThemeContext';
import { fetchNews, NewsItem } from '../../services/newApi';

export default function NewsDetailScreen() {
  const route = useRoute<any>();
  const { id } = route.params;
  const { theme } = useThemeCtx();
  const [news, setNews] = useState<NewsItem | null>(null);

  useEffect(() => {
    (async () => {
      const all = await fetchNews(Math.ceil(id/10));
      setNews(all.find(n => n.id === id) || null);
    })();
  }, [id]);

  const bgGradient = theme === 'dark'
    ? ['#0f2027','#203a43']
    : ['#1e3c72','#2a5298'];

  const cardBg = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)';

  if (!news) return (
    <LinearGradient colors={['#df41caff', '#2a5298']}  style={styles.container}>
      <Text style={styles.loading}>Yüklənir...</Text>
    </LinearGradient>
  );

  return (
    <LinearGradient colors={['#df41caff', '#2a5298']}  style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <Text style={styles.title}>{news.title}</Text>
          <Text style={styles.body}>{news.body}</Text>
          <Ionicons name="newspaper-outline" size={24} color="#fff" style={{ alignSelf:'flex-end', marginTop:12 }} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { color: '#fff', fontSize: 18, textAlign: 'center', marginTop: 50 },
  card: {
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: { fontSize: 20, fontWeight: '700', color: '#fff', marginBottom: 12 },
  body: { fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 22 },
});
