/** @format */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import PlantCard from "../components/PlantCard";
import { getUserGarden } from "../components/spec/index";
import { getImagesForPlants } from "../utils/utils";

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
        <View>
          <Text>
            "Start scanning and adding plants to your garden to see them here!"
          </Text>
        </View>
      );
    else
      return (
        <ScrollView
          style={{
            height: height,
            backgroundColor: "#aebb8f",
          }}
        >
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
        </ScrollView>
      );
  }
}

export default MyGarden;
