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
          <Stack.Navigator initialRouteName="CameraPage">
            <Stack.Screen name="CameraPage" component={CameraPage} />
            <Stack.Screen name="MyGarden" component={MyGarden} />
            <Stack.Screen name="UserPage" component={UserPage} />
            <Stack.Screen name="PlantPage" component={PlantPage} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else return <Login authenticateUser={this.authenticateUser} />;
  }
}

export default App;
