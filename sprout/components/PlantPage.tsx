/** @format */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

const PlantPage = ({ route }) => {
  const { plantInfo, plantImage } = route.params;
  console.log(plantInfo, '<--- plant Info here');
  return (
    <View>
      <Text>
        {plantInfo.commonName}, {plantInfo.scientificName}
        Duration: {plantInfo.duration}
        Family: {plantInfo.family}
        Difficulty: {plantInfo.difficulty}
        Care Instructions: Light level: {plantInfo.lightLevel}
        Soil pH: {plantInfo.ph}
        Watering Needs: {plantInfo.wateringSchedule}
      </Text>
      <Image
        style={{ width: 350, height: 300 }}
        source={{ uri: `data:image/gif;base64,${plantImage}` }}
      />
    </View>
  );
};

export default PlantPage;
