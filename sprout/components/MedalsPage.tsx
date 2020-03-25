/** @format */

import { View, Text, Image, Alert, StyleSheet } from "react-native";
import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

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
      <View style={styles.container}>
        {this.state.availableMedals.map(medal => {
          if (this.props.userMedals.includes(medal)) {
            return (
              <TouchableOpacity
                style={styles.images}
                onPress={() => {
                  Alert.alert("Medal achieved!", this.state.medalSlugs[medal]);
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
                style={styles.images}
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
