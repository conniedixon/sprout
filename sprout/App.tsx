/** @format */
import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraPage from './components/CameraPage';
import MyGarden from './components/MyGarden';
import UserPage from './components/UserPage';
import PlantPage from './components/PlantPage';
import PlantCard from './components/PlantCard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='CameraPage'>
        <Stack.Screen name='CameraPage' component={CameraPage} />
        <Stack.Screen name='MyGarden' component={MyGarden} />
        <Stack.Screen name='UserPage' component={UserPage} />
        <Stack.Screen name='PlantPage' component={PlantPage} />
        <Stack.Screen name='PlantCard' component={PlantCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
