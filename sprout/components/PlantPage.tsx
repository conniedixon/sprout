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
  //   console.log(plantInfo, "<===");
  return (
    <View>
      <Image
        style={{ width: 350, height: 300 }}
        source={{ uri: `data:image/gif;base64,${plantImage}` }}
      />
    </View>
  );
};

export default PlantPage;
