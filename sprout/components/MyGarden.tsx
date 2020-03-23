/** @format */

import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PlantCard from "../components/PlantCard";
import { getUserGarden } from "../components/spec/index";
import { getImagesForPlants } from "../utils/utils";
import GestureRecognizer from "react-native-swipe-gestures";

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
    const config = {
      velocityThreshold: 0.01,
      directionalOffsetThreshold: 50,
    };
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
        <GestureRecognizer
          onSwipeRight={state => this.onSwipeRight(state)}
          style={{ flex: 1, zIndex: 1000 }}
          config={config}
        >
          <View>
            <Text>MyGarden</Text>
            {this.state.myPlants.map(plant => {
              return (
                <PlantCard
                  plantInfo={plant}
                  navigation={this.props.navigation}
                  isInGarden={true}
                />
              );
            })}
          </View>
        </GestureRecognizer>
      );
  }
}

export default MyGarden;
