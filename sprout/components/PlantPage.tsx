/** @format */

import React, { Component } from "react";
import { Text, View, Button, Image, Alert } from "react-native";
import ImageCarousel from "./ImageCarousel";
import { addPlantToGarden, addToWishlist } from "./spec/index";
import { getUserScannedPlants } from "../components/spec/index";
import { awardMedal } from "../utils/medals";
import { addNotifications } from "../utils/notifications";

interface Props {
  route: any;
  navigation: any;
}

class PlantPage extends Component<Props> {
  state = {
    plantInfo: {
      images: [],
      commonName: "",
      duration: "duration",
      family: "family",
      scientificName: "scientificName",
      ph: "0",
      lightLevel: "lightLevel",
      minTemp: "tempMin",
      difficulty: "trafficLight",
      wateringSchedule: "wateringSchedule",
      wateringInterval: "wateringInterval",
    },
    plantImage: "",
    isInGarden: "",
    username: "",
    scannedPlantCount: 0,
  };

  componentDidMount() {
    const {
      plantInfo,
      plantImage,
      isInGarden,
      username,
      justScanned,
    } = this.props.route.params;
    getUserScannedPlants(username).then(plants => {
      this.setState(
        {
          plantInfo,
          plantImage,
          isInGarden,
          username,
          scannedPlantCount: plants.length,
        },
        () => {
          if (justScanned) {
            awardMedal(this.state.scannedPlantCount, () =>
              this.props.navigation.navigate("MedalsPage")
            );
          }
        }
      );
    });
  }

  images = {
    images: [{ url: this.state.plantImage }, this.state.plantInfo.images],
  };

  AsyncAlert = async (slug, location) =>
    new Promise((resolve, reject) => {
      Alert.alert(
        `Added to ${slug}`,
        " ",
        [
          {
            text: `Go to ${location}`,
            onPress: () =>
              this.props.navigation.navigate(location, {
                username: this.state.username,
              }),
          },
          {
            text: "Scan Another Plant",
            onPress: () => this.props.navigation.navigate("CameraPage"),
          },
        ],
        { cancelable: false }
      );
    });
  // this.setState({ alert: false });
  render() {
    const { plantInfo, username, isInGarden } = this.state;
    if (this.state.isInGarden === "isInWishlist") {
      return (
        <View>
          <ImageCarousel images={this.images} />
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
                this.AsyncAlert("your Garden", "MyGarden");
              })
            }
          />
        </View>
      );
    } else if (!isInGarden) {
      return (
        <View>
          <ImageCarousel images={this.images} />

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
                this.AsyncAlert("your Garden", "MyGarden");
              })
            }
          />
          <Button
            title="Add to My Wishlist"
            onPress={() =>
              addToWishlist(plantInfo, username).then(() => {
                this.AsyncAlert("your Wishlist", "Wishlist");
              })
            }
          />
          <Button
            title="Scan Another Plant"
            onPress={() => this.props.navigation.navigate("CameraPage")}
          />
        </View>
      );
    } else {
      return (
        <View>
          <ImageCarousel images={this.images} />

          <Text>
            {plantInfo.commonName}, {plantInfo.scientificName},Duration:{" "}
            {plantInfo.duration}, Family: {plantInfo.family}, Difficulty:{" "}
            {plantInfo.difficulty}, Care Instructions: Light level:{" "}
            {plantInfo.lightLevel}, Soil pH: {plantInfo.ph}, Watering Needs:{" "}
            {plantInfo.wateringSchedule}
          </Text>
          <Button
            title="Set Reminder"
            onPress={() => {
              addNotifications(plantInfo);
            }}
          />
        </View>
      );
    }
  }
}

export default PlantPage;
