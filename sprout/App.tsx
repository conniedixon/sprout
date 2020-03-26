import "react-native-gesture-handler";
import * as React from "react";
import Amplify, { Auth } from "aws-amplify";
import awsConfiguration from "./aws-config";
Amplify.configure(awsConfiguration);
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";
import CameraPage from "./components/CameraPage";
import MyGarden from "./components/MyGarden";
import UserPage from "./components/UserPage";
import PlantPage from "./components/PlantPage";
import Login from "./components/Login";
import Wishlist from "./components/Wishlist";
import ScannedPlants from "./components/ScannedPlants";
import PlantMap from "./components/PlantMap";
import LandingCarousel from "./components/LandingCarousel";
import * as Font from "expo-font";

const Stack = createStackNavigator();

class App extends React.Component {
  state = {
    user: {
      authenticated: false,
      username: "",
      firstLogin: false,
    },
  };

  componentDidMount() {
    Font.loadAsync({
      "patrick-hand-sc": require("./assets/fonts/Patrick_Hand_SC/PatrickHandSC-Regular.ttf"),
      "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
      "roboto-italic": require("./assets/fonts/Roboto/Roboto-LightItalic.ttf"),
    });
  }
  authenticateUser = (username, firstLogin) => {
    this.setState({ user: { authenticated: true, username, firstLogin } });
  };

  render() {
    const initialScreen = this.state.user.firstLogin
      ? "Intro Carousel"
      : "CameraPage";
    if (this.state.user.authenticated) {
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={initialScreen}
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="CameraPage"
              component={CameraPage}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name="MyGarden"
              component={MyGarden}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name="UserPage"
              component={UserPage}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name="PlantPage"
              component={PlantPage}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name="Wishlist"
              component={Wishlist}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen
              name="ScannedPlants"
              component={ScannedPlants}
              initialParams={{ username: this.state.user.username }}
            />
            <Stack.Screen name="PlantMap" component={PlantMap} />
            <Stack.Screen name="Intro Carousel" component={LandingCarousel} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else
      return (
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="Login"
              component={Login}
              initialParams={{ authenticateUser: this.authenticateUser }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
  }
}

export default App;
