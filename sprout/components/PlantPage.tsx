import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";

const PlantPage = ({ route }) => {
  const { plantInfo, plantImage } = route.params;
  console.log(plantInfo, "<===");
  console.log(plantImage, "<===");
  return (
    <View>
      <Text>plant page</Text>
      {/* <Image source={{ uri: plantImage.uri }} /> */}
    </View>
  );
};

export default PlantPage;
