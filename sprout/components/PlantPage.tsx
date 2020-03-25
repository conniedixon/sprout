/** @format */

import React, { Component } from "react";
import { Text, View, Alert, StyleSheet, ImageBackground } from "react-native";
import ImageCarousel from "./ImageCarousel";
import { addPlantToGarden, addToWishlist } from "./spec/index";
import { getUserScannedPlants } from "../components/spec/index";

import { addNotifications } from "./spec/notifications";
import { TouchableOpacity } from "react-native-gesture-handler";

const PlantPage = ({ route, navigation }) => {
  const { plantInfo, plantImage, isInGarden, username } = route.params;

  const images = {
    images: [{ url: plantImage }, plantInfo.images],
  };

  const MedalsAlert = () => {
    const award = "award";
    const description = "description";
    getUserScannedPlants(this.props.route.params.username).then(plants => {
      this.setState({ scannedPlantCount: plants.length });
    });
    new Promise((resolve, reject) => {
      Alert.alert(
        "Medal achieved!",
        `You've just been awarded the ${award} medal for ${description}`,
        [
          {
            text: "Go to Medals Page",
            onPress: () => navigation.navigate("MedalsPage"),
          },
          {
            text: "Continue",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
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
            onPress: () =>
              navigation.navigate(location, { username: username }),
          },
          {
            text: "Scan Another Plant",
            onPress: () => navigation.navigate("CameraPage"),
          },
        ],
        { cancelable: false }
      );
    });

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
            <Text style={styles.text}>Difficulty: {plantInfo.difficulty}</Text>
            <Text style={styles.subheader}>How to care for me:</Text>
            <Text>Light level:{plantInfo.lightLevel} </Text>
            <Text>Soil pH: {plantInfo.ph}</Text>

            <Text>Watering Needs:{plantInfo.wateringSchedule} </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                addPlantToGarden(plantInfo, username).then(() => {
                  AsyncAlert("your Garden", "MyGarden");
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
            <Text style={styles.text}>Difficulty: {plantInfo.difficulty}</Text>
            <Text style={styles.subheader}>How to care for me:</Text>
            <Text>Light level:{plantInfo.lightLevel} </Text>
            <Text>Soil pH: {plantInfo.ph}</Text>

            <Text>Watering Needs:{plantInfo.wateringSchedule} </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                addPlantToGarden(plantInfo, username).then(() => {
                  AsyncAlert("your Garden", "MyGarden");
                })
              }
            >
              <Text style={styles.button}>Add to My Garden</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                addToWishlist(plantInfo, username).then(() => {
                  AsyncAlert("your Wishlist", "Wishlist");
                })
              }
            >
              <Text style={styles.button}>Add to My Wishlist</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("CameraPage")}
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
};

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
