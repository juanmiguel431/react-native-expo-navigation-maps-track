import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  AccountScreen,
  SigninScreen,
  SignupScreen,
  TrackCreateScreen,
  TrackDetailScreen,
  TrackListScreen
} from './src/screens';
import { RootStackParamList, SCREEN } from './src/models/screen';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { TrackContext, TrackProvider } from './src/context/TrackContext';

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
    <Tab.Navigator>
      <Tab.Screen name={SCREEN.Account} component={AccountScreen}/>
      <Tab.Screen name={SCREEN.TrackCreate} component={TrackCreateScreen}/>
      <Tab.Screen name={SCREEN.Tracks} component={TrackComp} options={{ headerShown: false }}/>
    </Tab.Navigator>
  )
};

const LoginFlow = () => {
  return (
    <Stack.Navigator initialRouteName={SCREEN.Signin}>
      <Stack.Screen name={SCREEN.Signup} component={SignupScreen} options={{ title: 'Signup' }}/>
      <Stack.Screen name={SCREEN.Signin} component={SigninScreen} options={{ title: 'Signin' }}/>
    </Stack.Navigator>
  );
};

const AppContainer: React.FC = () => {
  const { state: { isLoggedIn } } = useContext(TrackContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SCREEN.LoginFlow} screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name={SCREEN.MainFlow} component={MainFlow}/>
        ) : (
          <Stack.Screen name={SCREEN.LoginFlow} component={LoginFlow}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

const App: React.FC = () => {
  return (
    <TrackProvider>
      <AppContainer/>
    </TrackProvider>
  );
};

export default App;
