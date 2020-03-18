/** @format */

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ScannedPlants = ({ navigation, route }) => {
  const { scannedPlants } = route.params;
  return (
    <View>
      <Text>My Scanned Plants:</Text>
      {scannedPlants.map(plant => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PlantPage', {
                plantInfo: plant
              });
            }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{ uri: plant.plantImage }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default ScannedPlants;
