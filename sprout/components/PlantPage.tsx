/** @format */

import React, { Component } from "react";
import {
  Text,
  View,
  Alert,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import ImageCarousel from "./ImageCarousel";
import { addPlantToGarden, addToWishlist, getUserGarden } from "./spec/index";
import { getUserScannedPlants } from "../components/spec/index";
import { awardMedal } from "../utils/medals";
import { addNotifications } from "../utils/notifications";
import styles from "./StyleCSS";

interface Props {
  route: any;
  navigation: any;
}

import { TouchableOpacity } from "react-native-gesture-handler";

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
            awardMedal(
              "ScannedPlants",
              this.state.scannedPlantCount,
              username,
              () => this.props.navigation.navigate("UserPage", { username })
            );
          }
        }
      );
    });
  }

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

  render() {
    const { plantInfo, username, isInGarden } = this.state;
    let { height, width } = Dimensions.get("window");

    const images = {
      images: [{ url: this.state.plantImage }, this.state.plantInfo.images],
    };
    if (isInGarden === "isInWishlist") {
      return (
        <View style={styles.topMargin}>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <ScrollView
              style={{
                height: height,
              }}
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={styles.container}>
                <ImageCarousel images={images} />

                <Text style={styles.header2}>{plantInfo.commonName}</Text>
                <Text style={styles.textItalic}>
                  {plantInfo.scientificName}
                </Text>
                <Text style={styles.text}>Duration: {plantInfo.duration}</Text>
                <Text style={styles.text}> Family: {plantInfo.family}</Text>
                <Text style={styles.text}>
                  Difficulty: {plantInfo.difficulty}
                </Text>
                <Text style={styles.subHeader}>How to care for me:</Text>
                <Text style={styles.text}>
                  Light level: {plantInfo.lightLevel}
                </Text>
                <Text style={styles.text}>Soil pH: {plantInfo.ph}</Text>
                <Text style={styles.text}>
                  Watering Needs: {plantInfo.wateringSchedule}{" "}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    addPlantToGarden(plantInfo, username).then(() => {
                      this.AsyncAlert("your Garden", "MyGarden");
                    })
                  }
                >
                  <Text style={styles.button}>Add to My Garden</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else if (!isInGarden) {
      return (
        <View style={styles.topMargin}>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <View style={styles.container}>
              <ImageCarousel images={images} />

              <Text style={styles.header2}>{plantInfo.commonName}</Text>
              <Text style={styles.textItalic}>{plantInfo.scientificName}</Text>
              <Text style={styles.text}>Duration: {plantInfo.duration}</Text>
              <Text style={styles.text}> Family: {plantInfo.family}</Text>
              <Text style={styles.text}>
                Difficulty: {plantInfo.difficulty}
              </Text>
              <Text style={styles.subHeader}>How to care for me:</Text>
              <Text style={styles.text}>
                Light level: {plantInfo.lightLevel}
              </Text>
              <Text style={styles.text}>Soil pH: {plantInfo.ph}</Text>
              <Text style={styles.text}>
                Watering Needs: {plantInfo.wateringSchedule}{" "}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  addPlantToGarden(plantInfo, username)
                    .then(() => {
                      return getUserGarden(username);
                    })
                    .then(garden => {
                      const gardenCount = Object.keys(garden).length;
                      return awardMedal(
                        "GardenPage",
                        garden.length,
                        username,
                        () => {
                          this.props.navigation.navigate("UserPage");
                        }
                      );
                    })
                    .then(() => {
                      this.AsyncAlert("your Garden", "MyGarden");
                    })
                }
              >
                <Text style={styles.button}>Add to My Garden</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  addToWishlist(plantInfo, username).then(() => {
                    this.AsyncAlert("your Wishlist", "Wishlist");
                  })
                }
              >
                <Text style={styles.button}>Add to My Wishlist</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate("CameraPage")}
              >
                <Text style={styles.button}>Scan Another Plant</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.topMargin}>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <View style={styles.container}>
              <ImageCarousel images={images} />
              <View>
                <Text style={styles.header2}>{plantInfo.commonName}</Text>
                <Text style={styles.textItalic}>
                  {plantInfo.scientificName}
                </Text>
                <Text style={styles.text}>Duration: {plantInfo.duration}</Text>
                <Text style={styles.text}> Family: {plantInfo.family}</Text>
                <Text style={styles.text}>
                  Difficulty: {plantInfo.difficulty}
                </Text>
                <Text style={styles.subHeader}>How to care for me:</Text>
                <Text style={styles.text}>
                  Light level: {plantInfo.lightLevel}
                </Text>
                <Text style={styles.text}>Soil pH: {plantInfo.ph}</Text>
                <Text style={styles.text}>
                  Watering Needs: {plantInfo.wateringSchedule}{" "}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  addNotifications(plantInfo);
                }}
              >
                <Text style={styles.button}>Set Watering Reminder</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

export default PlantPage;
