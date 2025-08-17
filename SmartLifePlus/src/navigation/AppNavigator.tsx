import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerNavigator from './DrawerNavigator';
import { useThemeCtx } from '../context/ThemeContext';
import { RootStackParamList } from './types';
import NewsDetailScreen from '../screens/news/NewsDetailScreen';
import TaskDetailScreen from '../screens/tasks/TaskDetailScreen';
import AddTaskScreen from '../screens/tasks/AddTaskScreen';
import AddNoteScreen from '../screens/notes/AddNoteScreen';
import NoteDetailModal from '../screens/notes/NoteDetailModal';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useThemeCtx();
  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="DrawerRoot" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="NewsDetail" component={NewsDetailScreen} options={{ title: 'Xəbər' }} />
        <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Tapşırıq' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Yeni tapşırıq' }} />
        <Stack.Screen name="AddNote" component={AddNoteScreen} options={{ title: 'Yeni qeyd' }} />
        <Stack.Screen name="NoteDetail" component={NoteDetailModal} options={{ title: 'Qeyd', presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
