/** @format */

import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, ImageBackground } from "react-native";
import ImageCarousel from "./ImageCarousel";
import { addPlantToGarden, addToWishlist } from "./spec/index";
import { getUserScannedPlants } from "../components/spec/index";
import { awardMedal } from "../utils/medals";
import { addNotifications } from "../utils/notifications";

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
            awardMedal(this.state.scannedPlantCount, username, () =>
              this.props.navigation.navigate("UserPage", { username })
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
    const images = {
      images: [{ url: this.state.plantImage }, ...this.state.plantInfo.images],
    };
    if (isInGarden === "isInWishlist") {
      return (
        <View>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <View style={styles.container}>
              <ImageCarousel images={images} />

              <Text style={styles.header}>{plantInfo.commonName}</Text>
              <Text style={styles.subheader}>{plantInfo.scientificName}</Text>
              <Text style={styles.text}>Duration: {plantInfo.duration}</Text>
              <Text style={styles.text}> Family: {plantInfo.family}</Text>
              <Text style={styles.text}>
                Difficulty: {plantInfo.difficulty}
              </Text>
              <Text style={styles.subheader}>How to care for me:</Text>
              <Text>Light level:{plantInfo.lightLevel} </Text>
              <Text>Soil pH: {plantInfo.ph}</Text>

              <Text>Watering Needs:{plantInfo.wateringSchedule} </Text>
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
          </ImageBackground>
        </View>
      );
    } else if (!isInGarden) {
      return (
        <View>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <View style={styles.container}>
              <ImageCarousel images={images} />

              <Text style={styles.header}>{plantInfo.commonName}</Text>
              <Text style={styles.subheader}>{plantInfo.scientificName}</Text>
              <Text style={styles.text}>Duration: {plantInfo.duration}</Text>
              <Text style={styles.text}> Family: {plantInfo.family}</Text>
              <Text style={styles.text}>
                Difficulty: {plantInfo.difficulty}
              </Text>
              <Text style={styles.subheader}>How to care for me:</Text>
              <Text>Light level:{plantInfo.lightLevel} </Text>
              <Text>Soil pH: {plantInfo.ph}</Text>

              <Text>Watering Needs:{plantInfo.wateringSchedule} </Text>
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
        <View>
          <ImageBackground
            source={require("./graphics/Background.jpg")}
            style={styles.backgroundImage}
          >
            <View style={styles.container}>
              <ImageCarousel images={images} />
              <View>
                <Text style={styles.header}>{plantInfo.commonName}</Text>
                <Text style={styles.subheader}>{plantInfo.scientificName}</Text>
                <Text style={styles.text}>Duration: {plantInfo.duration}</Text>
                <Text style={styles.text}> Family: {plantInfo.family}</Text>
                <Text style={styles.text}>
                  Difficulty: {plantInfo.difficulty}
                </Text>
                <Text style={styles.subheader}>How to care for me:</Text>
                <Text style={styles.text}>
                  Light level:{plantInfo.lightLevel}{" "}
                </Text>
                <Text style={styles.text}>Soil pH: {plantInfo.ph}</Text>
                <Text style={styles.text}>
                  Watering Needs:{plantInfo.wateringSchedule}{" "}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  addNotifications(plantInfo);
                }}
              >
                <Text style={styles.button}>Remind Me To Water</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#aebb8f",
    color: "white",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    justifyContent: "space-around",
    margin: 3,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
  },
  subheader: {
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  imagecontainer: {},
});

export default PlantPage;
