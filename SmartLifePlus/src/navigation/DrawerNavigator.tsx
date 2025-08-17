import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import TasksListScreen from '../screens/tasks/TaskListScreen';
import NotesListScreen from '../screens/notes/NotesListScreen';
import WeatherScreen from '../screens/weather/WeatherScreen';
import NewsListScreen from '../screens/news/NewsListScreen';
import { useThemeCtx } from '../context/ThemeContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const { theme } = useThemeCtx();
  const isDark = theme === 'dark';

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: isDark ? '#ff93faff' : '#770992ff' },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: isDark ? '#2a2a2a' : '#770992ff',
        },
        drawerActiveTintColor: '#e5aff0ff',
        drawerInactiveTintColor: '#fff',
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Əsas səhifə' }} />
      <Drawer.Screen name="Tasks" component={TasksListScreen} options={{ title: 'Tapşırıqlar' }} />
      <Drawer.Screen name="Notes" component={NotesListScreen} options={{ title: 'Qeydlər' }} />
      <Drawer.Screen name="Weather" component={WeatherScreen} options={{ title: 'Hava' }} />
      <Drawer.Screen name="News" component={NewsListScreen} options={{ title: 'Xəbərlər' }} />
      <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />
    </Drawer.Navigator>
  );
}
