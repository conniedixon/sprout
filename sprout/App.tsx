/** @format */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from './components/Camera';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Camera' component={Camera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
