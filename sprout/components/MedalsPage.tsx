/** @format */

import { View, Text, Image, Alert, StyleSheet } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Animatable from "react-native-animatable";

interface Props {
  userMedals: any;
}

class MedalsPage extends Component<Props> {
  state = {
    availableMedals: [
      "scannedOnePlant",
      "scannedTenPlants",
      "scannedFiftyPlants",
      "addedOnePlant",
      "addedTenPlants",
      "addedFiftyPlants",
      "medal7",
      "medal8",
      "medal9",
    ],
    medalSlugs: {
      scannedOnePlant: "Discoverer: Scanned One Plant",
      scannedTenPlants: "Explorer: Scanned Ten Plants",
      scannedFiftyPlants: "Adventurer: Scanned Fifty Plants",
      addedOnePlant: "Plant Parent: Added your first plant to your Garden",
      addedTenPlants: "Plant Pioneer: Added your tenth plant to your Garden",
      addedFiftyPlants:
        "Plant Hoarder: Added your fiftieth plant to your Garden",
    },
  };

  render() {
    return (
      <Animatable.View animation="fadeInUpBig">
        <View style={styles.container}>
          {this.state.availableMedals.map(medal => {
            if (this.props.userMedals.includes(medal)) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Medal achieved!",
                      this.state.medalSlugs[medal]
                    );
                  }}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("./graphics/Achieved_.png")}
                  />
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      "Medal not yet achieved",
                      "Keep scanning and adding plants to unlock this medal!"
                    );
                  }}
                >
                  <Image
                    style={{ width: 100, height: 100 }}
                    source={require("./graphics/Notachieved_.png")}
                  />
                </TouchableOpacity>
              );
            }
          })}
        </View>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default MedalsPage;
