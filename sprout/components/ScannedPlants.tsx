/** @format */

import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ScannedPlants = ({ navigation, route }) => {
  const { scannedPlants } = route.params;
  return (
    <View>
      <Text>My Scanned Plants:</Text>
      {scannedPlants.map(plant => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("PlantPage", {
                plantInfo: plant,
                isInGarden: false,
                username: route.params.username,
                plantImage: plant.images[0].url, //needs to be changed
              });
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: plant.images[0].url }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
    //sort by date added
    //delete a scanned plant
    //add to my wishlist
  );
};

export default ScannedPlants;
