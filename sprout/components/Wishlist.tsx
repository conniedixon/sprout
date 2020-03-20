/** @format */

import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PlantCard from "../components/PlantCard";
import PlantMap from "./PlantMap";

interface Props {
  navigation: any;
  wishlist: any;
}

class Wishlist extends Component<Props> {
  state = {};
  render() {
    if (!this.props.wishlist) {
      return (
        <View>
          <Text>Add Plants to your Wishlist to see them here!</Text>
          <PlantMap />
        </View>
      );
    } else {
      return (
        <View>
          <Text>My Wishlist</Text>
          <Text>Tap on a plant to see details and add to your Garden</Text>
          <PlantMap />

          {this.props.wishlist.map(plant => {
            return (
              <PlantCard
                plantInfo={plant}
                navigation={this.props.navigation}
                isInGarden={false}
              />
            );
          })}
        </View>
      );
    }
  }
}

export default Wishlist;
