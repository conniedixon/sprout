/** @format */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import PlantCard from "../components/PlantCard";
import { getUserGarden } from "../components/spec/index";
import { getImagesForPlants } from "../utils/utils";
import GestureRecognizer from "react-native-swipe-gestures";
import * as Animatable from "react-native-animatable";

interface Props {
  navigation: any;
  route: any;
}

class MyGarden extends Component<Props> {
  state = {
    isInGarden: true,
    myPlants: [],
    isLoading: true,
    isEmpty: true,
  };

  componentDidMount() {
    const { username } = this.props.route.params;
    getUserGarden(username).then(garden => {
      getImagesForPlants(username, garden).then(plants => {
        if (garden.length === 0) this.setState({ isLoading: false });
        else
          this.setState({ myPlants: plants, isLoading: false, isEmpty: false });
      });
    });
  }

  onSwipeRight(gestureState) {
    console.log("Swiped right!");
    this.props.navigation.navigate("CameraPage");
  }

  render() {
    let { height, width } = Dimensions.get("window");
    if (this.state.isLoading)
      return (
        <View>
          <Text>'Loading...'</Text>
        </View>
      );
    if (this.state.isEmpty)
      return (
        <GestureRecognizer
          onSwipeRight={state => this.onSwipeRight(state)}
          style={{ flex: 1 }}
        >
          <View>
            <Text>
              "Start scanning and adding plants to your garden to see them
              here!"
            </Text>
          </View>
        </GestureRecognizer>
      );
    else
      return (
        <ImageBackground
          source={require("./graphics/Background.jpg")}
          style={{ width: "100%", height: "100%" }}
        >
          <GestureRecognizer
            onSwipeRight={state => this.onSwipeRight(state)}
            style={{ flex: 1 }}
          >
            <Animatable.View animation="fadeInUpBig">
              <ScrollView
                style={{
                  height: height,
                }}
                contentContainerStyle={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, margin: 10 }}>MyGarden</Text>
                {this.state.myPlants.map(plant => {
                  return (
                    <PlantCard
                      plantInfo={plant}
                      navigation={this.props.navigation}
                      isInGarden={true}
                    />
                  );
                })}
              </ScrollView>
            </Animatable.View>
          </GestureRecognizer>
        </ImageBackground>
      );
  }
}

export default MyGarden;
