/** @format */

import React, { Component } from "react";
import { Text, View, Button, Image, Alert } from "react-native";
import ImageCarousel from "./ImageCarousel";
import { addPlantToGarden, addToWishlist } from "./spec/index";
import { getUserScannedPlants } from "../components/spec/index";

const PlantPage = ({ route, navigation }) => {
  const { plantInfo, plantImage, isInGarden, username } = route.params;

  const images = {
    images: [{ url: plantImage }, plantInfo.images]
  };

  console.log(images);

  // var filtered = array.filter(function (el) {
  //   return el != null;
  // });

  const MedalsAlert = () => {
    const award = "award";
    const description = "description";
    getUserScannedPlants(this.props.route.params.username).then(plants => {
      console.log(plants, "<-- plants!");
      this.setState({ scannedPlantCount: plants.length });
    });
    new Promise((resolve, reject) => {
      Alert.alert(
        "Medal achieved!",
        `You've just been awarded the ${award} medal for ${description}`,
        [
          {
            text: "Go to Medals Page",
            onPress: () => navigation.navigate("MedalsPage")
          },
          {
            text: "Continue",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ]
      );
    });
  };
  // console.log(plantCount, '<-- plant count');
  // if (plantCount === 1) {
  //   MedalsAlert('Discoverer', 'scanning your first plant!');
  // }
  // if (plantCount === 10) {
  //   MedalsAlert('Explorer', 'scanning ten plants!');
  // }
  // if (plantCount === 50) {
  //   MedalsAlert('Adventurer', 'scanning fifty plants!');
  // }

  const AsyncAlert = async (slug, location) =>
    new Promise((resolve, reject) => {
      Alert.alert(
        `Added to ${slug}`,
        " ",
        [
          {
            text: `Go to ${location}`,
            onPress: () => navigation.navigate(location, { username: username })
          },
          {
            text: "Scan Another Plant",
            onPress: () => navigation.navigate("CameraPage")
          }
        ],
        { cancelable: false }
      );
    });

  if (isInGarden === "isInWishlist") {
    return (
      <View>
        {MedalsAlert()}
        <ImageCarousel images={images} />
        <Text>
          {plantInfo.commonName}, {plantInfo.scientificName},Duration:{" "}
          {plantInfo.duration}, Family: {plantInfo.family}, Difficulty:{" "}
          {plantInfo.difficulty}, Care Instructions: Light level:{" "}
          {plantInfo.lightLevel}, Soil pH: {plantInfo.ph}, Watering Needs:{" "}
          {plantInfo.wateringSchedule}
        </Text>
        <Button
          title="Add to My Garden"
          onPress={() =>
            addPlantToGarden(plantInfo, username).then(() => {
              AsyncAlert("your Garden", "MyGarden");
            })
          }
        />
      </View>
    );
  } else if (!isInGarden) {
    return (
      <View>
        <ImageCarousel images={images} />

        <Text>
          {plantInfo.commonName}, {plantInfo.scientificName},Duration:{" "}
          {plantInfo.duration}, Family: {plantInfo.family}, Difficulty:{" "}
          {plantInfo.difficulty}, Care Instructions: Light level:{" "}
          {plantInfo.lightLevel}, Soil pH: {plantInfo.ph}, Watering Needs:{" "}
          {plantInfo.wateringSchedule}
        </Text>
        <Button
          title="Add to My Garden"
          onPress={() =>
            addPlantToGarden(plantInfo, username).then(() => {
              AsyncAlert("your Garden", "MyGarden");
            })
          }
        />
        <Button
          title="Add to My Wishlist"
          onPress={() =>
            addToWishlist(plantInfo, username).then(() => {
              AsyncAlert("your Wishlist", "Wishlist");
            })
          }
        />
        <Button
          title="Scan Another Plant"
          onPress={() => navigation.navigate("CameraPage")}
        />
      </View>
    );
  } else {
    return (
      <View>
        <ImageCarousel images={images} />

        <Text>
          {plantInfo.commonName}, {plantInfo.scientificName},Duration:{" "}
          {plantInfo.duration}, Family: {plantInfo.family}, Difficulty:{" "}
          {plantInfo.difficulty}, Care Instructions: Light level:{" "}
          {plantInfo.lightLevel}, Soil pH: {plantInfo.ph}, Watering Needs:{" "}
          {plantInfo.wateringSchedule}
        </Text>
      </View>
    );
  }
};

export default PlantPage;
