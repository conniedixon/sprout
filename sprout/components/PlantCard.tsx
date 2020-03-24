/** @format */

import React, { Component } from "react";
import { View, Text, Image, ScrollView, Dimensions } from "react-native";
import Ph from "./Ph";
import LightLevel from "./LightLevel";
import Temp from "./Temp";
import Watering from "./Watering";
import Difficulty from "./Difficulty";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    let { height, width } = Dimensions.get("window");
    if (this.state.isLoading) return "Loading...";
    const {
      commonName,
      ph,
      lightLevel,
      minTemp,
      wateringSchedule,
      images,
      trafficlight,
      uri,
    } = this.props.plantInfo;
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("PlantPage", {
              plantInfo: this.props.plantInfo,
              isInGarden: this.props.isInGarden,
              plantImage: uri,
            })
          }
        >
          <View
            style={{
              height: 370,
              width: 350,
              margin: 10,
              backgroundColor: "white",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ margin: 5 }}>{commonName}</Text>
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
            <Text>Planted: (date here!)</Text>
          </View>
        </TouchableOpacity>
      </View>
      //set reminder to water
      //delete
      //edit values and picture
      //add date and image from BEN
    );
  }
}

export default PlantCard;
