import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import {
  AccountScreen,
  SigninScreen,
  SignupScreen,
  TrackCreateScreen,
  TrackDetailScreen,
  TrackListScreen,
  ResolveAuthScreen
} from './src/screens';
import { RootStackParamList, SCREEN } from './src/models/screen';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './src/RootNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<RootStackParamList>();
// const Tab = createMaterialBottomTabNavigator();

const TrackComp: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.TrackList}>
      <Stack.Screen name={SCREEN.TrackList} component={TrackListScreen} options={{ title: 'Track List' }}/>
      <Stack.Screen name={SCREEN.TrackDetail} component={TrackDetailScreen} options={{ title: 'Track Detail' }}/>
    </Stack.Navigator>
  );
}

const MainFlow: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName={SCREEN.Tracks}>
      <Tab.Screen name={SCREEN.Tracks} component={TrackComp} options={{ headerShown: false }}/>
      <Tab.Screen name={SCREEN.TrackCreate} component={TrackCreateScreen}/>
      <Tab.Screen name={SCREEN.Account} component={AccountScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
};

const LoginFlow: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Signup}>
      <Stack.Screen name={SCREEN.Signup} component={SignupScreen} options={{ headerShown: false }}/>
      <Stack.Screen name={SCREEN.Signin} component={SigninScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const resolveAuth = (isSignedIn: boolean | null) => {
  switch (isSignedIn) {
    case true:
      return <Stack.Screen name={SCREEN.MainFlow} component={MainFlow}/>;
    case false:
      return <Stack.Screen name={SCREEN.LoginFlow} component={LoginFlow}/>;
    default:
      return <Stack.Screen name={SCREEN.ResolveAuth} component={ResolveAuthScreen}/>
  }
}

const AppContainer: React.FC = () => {
  const { state: { isSignedIn } } = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {resolveAuth(isSignedIn)}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StatusBar style="auto" />
      <AppContainer/>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
