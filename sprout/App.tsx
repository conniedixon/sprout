/** @format */
import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './components/Camera';
import MyGarden from './components/MyGarden';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Camera'>
        <Stack.Screen name='Camera' component={Camera} />
        <Stack.Screen name='MyGarden' component={MyGarden} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
