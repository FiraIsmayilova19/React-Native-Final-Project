import React, { useState, useEffect, useRef } from 'react';
import {
  View, TextInput, Pressable, Text, StyleSheet, Image,
  ActivityIndicator, ScrollView, Animated
} from 'react-native';
import { fetchWeather, getLastWeather, WeatherData } from '../../services/weatherApi';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const weatherIcons: Record<string, string> = {
  '01d': 'weather-sunny',
  '01n': 'weather-night',
  '02d': 'weather-partly-cloudy',
  '02n': 'weather-partly-cloudy',
  '03d': 'weather-cloudy',
  '03n': 'weather-cloudy',
  '04d': 'weather-cloudy',
  '04n': 'weather-cloudy',
  '09d': 'weather-pouring',
  '09n': 'weather-pouring',
  '10d': 'weather-rainy',
  '10n': 'weather-rainy',
  '11d': 'weather-lightning',
  '11n': 'weather-lightning',
  '13d': 'weather-snowy',
  '13n': 'weather-snowy',
  '50d': 'weather-fog',
  '50n': 'weather-fog',
};

export default function WeatherScreen() {
  const [city, setCity] = useState('Bakı');
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const load = async () => {
    setLoading(true);
    setError(null);
    fadeAnim.setValue(0);

    try {
      const d = await fetchWeather(city);
      setData(d);

      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (err) {
      setError('Hava məlumatı alına bilmədi');

      const cached = await getLastWeather();
      if (cached) {
        setData(cached);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <LinearGradient colors={['#f744e8ff', '#2a5298']} style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.header}>Hava Proqnozu</Text>

        <View style={styles.searchContainer}>
          <TextInput
            value={city}
            onChangeText={setCity}
            placeholder="Şəhər adı daxil edin..."
            placeholderTextColor="#ddd"
            style={styles.input}
            returnKeyType="search"
            onSubmitEditing={load}
          />
          <Pressable onPress={load} style={styles.searchButton}>
            <Ionicons name="search" size={22} color="#fff" />
          </Pressable>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Yüklənir...</Text>
          </View>
        ) : error && !data ? (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="weather-cloudy-alert" size={50} color="#ff6b6b" />
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={load} style={styles.retryButton}>
              <Text style={styles.retryText}>Yenidən yoxla</Text>
            </Pressable>
          </View>
        ) : data ? (
          <Animated.View style={[styles.weatherCard, { opacity: fadeAnim }]}>
            <View style={styles.weatherHeader}>
              <Text style={styles.city}>{data.city}</Text>
              <MaterialCommunityIcons
                name={weatherIcons[data.icon!] || 'weather-cloudy' as any}
                size={40}
                color="#fff"
              />
            </View>

            <View style={styles.weatherMain}>
              <Text style={styles.temperature}>{data.temp}°C</Text>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${data.icon}@4x.png` }}
                style={styles.weatherImage}
              />
            </View>

            <Text style={styles.description}>{data.desc}</Text>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <Ionicons name="thermometer" size={20} color="#fff" />
                <Text style={styles.detailText}>Hiss edilən: {data.temp}°C</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="water" size={20} color="#fff" />
                <Text style={styles.detailText}>Nəmlik: -%</Text>
              </View>
            </View>
          </Animated.View>
        ) : (
          <View style={styles.noDataContainer}>
            <MaterialCommunityIcons name="weather-cloudy" size={50} color="#fff" />
            <Text style={styles.noDataText}>Məlumat mövcud deyil</Text>
            <Pressable onPress={load} style={styles.retryButton}>
              <Text style={styles.retryText}>Yenidən yoxla</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { fontSize: 28, fontWeight: '700', color: '#fff', marginBottom: 20 },
  searchContainer: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 20,
  },
  input: { flex: 1, height: 50, paddingHorizontal: 16, fontSize: 16, color: '#fff' },
  searchButton: { width: 50, backgroundColor: '#6a11cb', justifyContent: 'center', alignItems: 'center' },
  loadingContainer: { alignItems: 'center', paddingVertical: 40 },
  loadingText: { marginTop: 10, color: '#fff', fontSize: 16 },
  weatherCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  weatherHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  city: { fontSize: 22, fontWeight: '600', color: '#fff' },
  weatherMain: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  temperature: { fontSize: 60, fontWeight: '200', color: '#fff' },
  weatherImage: { width: 100, height: 100 },
  description: { fontSize: 16, color: '#fff', textAlign: 'center', marginBottom: 15 },
  detailsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  detailText: { color: '#fff', fontSize: 14 },
  errorContainer: { alignItems: 'center', paddingVertical: 40 },
  errorText: { marginTop: 15, color: '#ff6b6b', fontSize: 16, fontWeight: '600' },
  noDataContainer: { alignItems: 'center', paddingVertical: 40 },
  noDataText: { marginTop: 15, color: '#fff', fontSize: 16 },
  retryButton: {
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
  },
  retryText: { color: '#fff', fontWeight: '600' },
});
