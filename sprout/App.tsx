/** @format */
import "react-native-gesture-handler";
import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraPage from "./components/CameraPage";
import MyGarden from "./components/MyGarden";
import UserPage from "./components/UserPage";
import PlantPage from "./components/PlantPage";
import PlantCard from "./components/PlantCard";
import ScannedPlants from "./components/ScannedPlants";
import LandingCarousel from "./components/LandingCarousel";
import PlantMap from "./components/PlantMap";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CameraPage">
        <Stack.Screen name="CameraPage" component={CameraPage} />
        <Stack.Screen name="MyGarden" component={MyGarden} />
        <Stack.Screen name="UserPage" component={UserPage} />
        <Stack.Screen name="PlantPage" component={PlantPage} />
        <Stack.Screen name="PlantCard" component={PlantCard} />
        <Stack.Screen name="ScannedPlants" component={ScannedPlants} />
        <Stack.Screen name="LandingCarousel" component={LandingCarousel} />
        <Stack.Screen name="PlantMap" component={PlantMap} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//Take a picture of a plant, upload a picture or search by plant name to identify a plant and how to care for it
//Add plants to your garden (swipe left) and keep track of their needs
//Achieve medals for scanning plants and see what plants you've scanned (swipe right)
