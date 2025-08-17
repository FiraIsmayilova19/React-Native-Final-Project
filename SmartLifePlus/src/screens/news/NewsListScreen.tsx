import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { fetchNews, NewsItem } from '../../services/newApi';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useThemeCtx } from '../../context/ThemeContext';

export default function NewsListScreen() {
  const nav = useNavigation<any>();
  const { theme } = useThemeCtx();
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await fetchNews(page);
    setItems(prev => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => { load(); }, [page]);


  const cardBg = theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.15)';

  return (
    <LinearGradient colors={['#df41caff', '#2a5298']}  style={styles.container}>
      <FlatList
        contentContainerStyle={{ padding: 20 }}
        data={items}
        keyExtractor={(it) => String(it.id)}
        onEndReached={() => setPage(p => p + 1)}
        onEndReachedThreshold={0.5}
        ItemSeparatorComponent={() => <View style={{height:12}} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => nav.navigate('NewsDetail', { id: item.id, title: item.title })}
            style={[styles.card, { backgroundColor: cardBg }]}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.body}>{item.body}</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#fff" style={{alignSelf:'flex-end', marginTop:6}} />
          </Pressable>
        )}
        ListFooterComponent={() => loading ? <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 20 }} /> : null}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: {
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 4 },
  body: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
});
