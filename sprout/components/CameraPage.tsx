/** @format */
import "react-native-gesture-handler";
import { Component } from "react";
import * as React from "react";
import { Text, View, Button, TouchableOpacity, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as api from "../api";
import SearchBar from "./SearchBar";

interface Props {
  navigation: any;
}

class CameraPage extends Component<Props> {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    plantInfo: {},
    plantImage: ""
  };

  camera: Camera | null = null;

  async componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === "ios") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === "granted") {
        this.setState({ rollGranted: true });
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      this.setState({ hasPermission: status === "granted" });
    }
  };

  takePicture() {
    return new Promise((resolve, reject) => {
      console.log("Picture Taken!");
      if (this.camera) {
        const options = { base64: true };
        this.camera
          .takePictureAsync(options)
          .then(photo => {
            this.camera.pausePreview();
            console.log("photo taken");
            this.setState({ plantImage: photo.uri });
            return api.getPlantById(photo.base64);
          })
          .then(plantInfo => {
            this.camera.resumePreview();
            this.setState({ plantInfo });
          })
          .then(() => {
            this.props.navigation.navigate("PlantPage", {
              plantInfo: this.state.plantInfo,
              plantImage: this.state.plantImage
            });
          });
      }
    });
  }

  pickImage() {
    return new Promise((resolve, reject) => {
      ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true
      })
        .then(result => {
          if (result.cancelled === false) {
            this.setState({ plantImage: result.uri });
            return api.getPlantById(result.base64);
          }
        })
        .then(plantInfo => {
          this.setState({ plantInfo });
        })
        .then(() => {
          this.props.navigation.navigate("PlantPage", {
            plantInfo: this.state.plantInfo,
            plantImage: this.state.plantImage
          });
        });
    });
  }

  onSearch = searchText => {
    return new Promise((resolve, reject) => {
      resolve(api.getScientificName(searchText.toLowerCase()));
    })
      .then(plantInfo => {
        this.setState({ plantInfo });
      })
      .then(() => {
        this.props.navigation.navigate("PlantPage", {
          plantInfo: this.state.plantInfo
        });
      });
  };

  render() {
    const { hasPermission } = this.state;

    if (hasPermission === null || hasPermission === false) {
      return (
        <View>
          <SearchBar onSearch={this.onSearch} />
          <Text>No access to camera or no permission</Text>
          <Button
            title="Go to My Garden"
            onPress={() => this.props.navigation.navigate("MyGarden")}
          />
          <Button
            title="Go to My Account"
            onPress={() => this.props.navigation.navigate("UserPage")}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <SearchBar onSearch={this.onSearch} />
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}
          >
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
              onPress={() => this.takePicture()}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
              onPress={() => this.pickImage()}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#fff", fontSize: 40 }}
              />
            </TouchableOpacity>
          </Camera>
          <Button
            title="Go to My Garden"
            onPress={() => this.props.navigation.navigate("MyGarden")}
          />
          <Button
            title="Go to My Account"
            onPress={() => this.props.navigation.navigate("UserPage")}
          />
        </View>
      );
    }
  }
}

export default CameraPage;
