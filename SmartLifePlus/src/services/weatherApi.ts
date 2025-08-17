import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const WEATHER_KEY = 'weather:last';
const OPEN_WEATHER_KEY = 'f2f5c1e2f188b774fc9259e4d22a27c5';

export type WeatherData = {
  city: string;
  temp: number;
  desc: string;
  icon: string;
};

export async function fetchWeather(city: string): Promise<WeatherData> {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      { params: { q: city, units: 'metric', appid: OPEN_WEATHER_KEY, lang: 'az' } }
    );
    const result: WeatherData = {
      city: data.name,
      temp: Math.round(data.main.temp),
      desc: data.weather[0].description,
      icon: data.weather[0].icon,
    };
    await AsyncStorage.setItem(WEATHER_KEY, JSON.stringify(result));
    return result;
  } catch (err) {
    const raw = await AsyncStorage.getItem(WEATHER_KEY);
    if (raw) return JSON.parse(raw);
    throw err;
  }
}

export async function getLastWeather(): Promise<WeatherData | null> {
  const raw = await AsyncStorage.getItem(WEATHER_KEY);
  return raw ? JSON.parse(raw) : null;
}
