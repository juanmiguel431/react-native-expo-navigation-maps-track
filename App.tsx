import React, { useContext } from 'react';
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
  TrackListScreen
} from './src/screens';
import { RootStackParamList, SCREEN } from './src/models/screen';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './src/RootNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const TrackComp = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.TrackList}>
      <Stack.Screen name={SCREEN.TrackList} component={TrackListScreen} options={{ title: 'Track List' }}/>
      <Stack.Screen name={SCREEN.TrackDetail} component={TrackDetailScreen} options={{ title: 'Track Detail' }}/>
    </Stack.Navigator>
  );
}

const MainFlow = () => {
  return (
    <Tab.Navigator initialRouteName={SCREEN.Tracks}>
      <Tab.Screen name={SCREEN.Tracks} component={TrackComp} options={{ headerShown: false }}/>
      <Tab.Screen name={SCREEN.TrackCreate} component={TrackCreateScreen}/>
      <Tab.Screen name={SCREEN.Account} component={AccountScreen}/>
    </Tab.Navigator>
  )
};

const LoginFlow = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Signup}>
      <Stack.Screen name={SCREEN.Signup} component={SignupScreen} options={{ headerShown: false }}/>
      <Stack.Screen name={SCREEN.Signin} component={SigninScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

const AppContainer: React.FC = () => {
  const { state: { isSignedIn } } = useContext(AuthContext);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={SCREEN.LoginFlow} screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <Stack.Screen name={SCREEN.MainFlow} component={MainFlow}/>
        ) : (
          <Stack.Screen name={SCREEN.LoginFlow} component={LoginFlow}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContainer/>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
