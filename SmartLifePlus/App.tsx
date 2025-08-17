import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { ThemeProvider, useThemeCtx } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import registerNNPushToken from 'native-notify';

function Root() {
  const { theme } = useThemeCtx();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <AppNavigator />
    </SafeAreaView>
  );
}

export default function App() {
  registerNNPushToken(31764, '0pKrUZOMsula8E8YvRsFoQ');
  return (
    <ThemeProvider>
      <UserProvider>
        <Root />
      </UserProvider>
    </ThemeProvider>
  );
}
