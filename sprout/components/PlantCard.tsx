/** @format */

import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import Ph from "./Ph";
import LightLevel from "./LightLevel";
import Temp from "./Temp";
import Watering from "./Watering";
import Difficulty from "./Difficulty";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./StyleCSS";

interface Props {
  plantInfo: any;
  navigation: any;
  isInGarden: any;
}

class PlantCard extends Component<Props> {
  state = {
    isLoading: false,
  };

  render() {
    if (this.state.isLoading) return "Loading...";
    const {
      commonName,
      ph,
      lightLevel,
      minTemp,
      wateringSchedule,
      trafficlight,
    } = this.props.plantInfo.plantInfo;
    const { uri } = this.props.plantInfo;
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("PlantPage", {
              plantInfo: this.props.plantInfo.plantInfo,
              isInGarden: this.props.isInGarden,
              plantImage: uri,
            })
          }
        >
          <View style={styles.plantCard}>
            <Text style={styles.header2}>{commonName}</Text>
            <Image
              style={{ width: 250, height: 250, borderRadius: 10, margin: 5 }}
              source={{ uri: uri }}
            />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                height: 75,
                justifyContent: "space-evenly",
                margin: 5,
              }}
            >
              <Ph ph={ph}></Ph>
              <LightLevel lightlevel={lightLevel}></LightLevel>
              <Temp temp={minTemp}></Temp>
              <Watering watering={wateringSchedule}></Watering>
              <Difficulty trafficlight={trafficlight}></Difficulty>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default PlantCard;
