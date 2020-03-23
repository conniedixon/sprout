/** @format */

import "react-native-gesture-handler";
import * as React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsConfiguration from "./aws-config";
Amplify.configure(awsConfiguration);
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraPage from "./components/CameraPage";
import MyGarden from "./components/MyGarden";
import UserPage from "./components/UserPage";
import PlantPage from "./components/PlantPage";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import ScannedPlants from "./components/ScannedPlants";
import ImageS3 from "./components/ImageS3";

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    user: {
      authenticated: false,
      username: ""
    }
  };

  authenticateUser = username => {
    this.setState({ user: { authenticated: true, username } });
  };

  render() {
    if (this.state.user.authenticated) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Camera Page'>
            <Stack.Screen
              name='CameraPage'
              component={CameraPage}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name='MyGarden'
              component={MyGarden}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name='UserPage'
              component={UserPage}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name='PlantPage'
              component={PlantPage}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name='Wishlist'
              component={Wishlist}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name='ScannedPlants'
              component={ScannedPlants}
              initialParams={{ username: this.state.user.username }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
              name='Login'
              component={Login}
              initialParams={{ authenticateUser: this.authenticateUser }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}

//Take a picture of a plant, upload a picture or search by plant name to identify a plant and how to care for it
//Add plants to your garden (swipe left) and keep track of their needs
//Achieve medals for scanning plants and see what plants you've scanned (swipe right)

export default App;
