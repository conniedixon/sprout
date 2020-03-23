/** @format */

import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import Ph from "./Ph";
import LightLevel from "./LightLevel";
import Temp from "./Temp";
import Watering from "./Watering";
import Difficulty from "./Difficulty";

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
      images,
      trafficlight,
    } = this.props.plantInfo;
    return (
      <View>
        <>
          <Text>{commonName}</Text>
          <Ph ph={ph}></Ph>
          <LightLevel lightlevel={lightLevel}></LightLevel>
          <Temp temp={minTemp}></Temp>
          <Text>
            ph:{ph}, lightLevel:{lightLevel}, minTemp:{minTemp}
          </Text>
          <Watering watering={wateringSchedule}></Watering>
          <Text>watering schedule: {wateringSchedule}</Text>
          <Difficulty trafficlight={trafficlight}></Difficulty>
          <Text>Planted: (date here!)</Text>
          <Button
            title="View full details"
            onPress={() =>
              this.props.navigation.navigate("PlantPage", {
                plantInfo: this.props.plantInfo,
                isInGarden: this.props.isInGarden,
              })
            }
          />
        </>
      </View>
      //set reminder to water
      //delete
      //edit values and picture
      //add date and image from BEN
    );
  }
}

export default PlantCard;
