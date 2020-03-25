/** @format */
import "react-native-gesture-handler";
import { Component } from "react";
import * as React from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as api from "../api";
import SearchBar from "./SearchBar";

interface Props {
  navigation: any;
  route: any;
}

interface State {
  searchVisible: boolean;
  rollGranted: boolean;
  hasPermission: boolean;
  plantInfo: any;
  plantImage: string;
}

class CameraPage extends Component<Props, State> {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    plantInfo: {},
    plantImage: "",
    searchVisible: false,
    rollGranted: false,
  };

  camera: Camera | null = null;

  componentDidMount() {
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
            return api.getPlantById(
              photo.base64,
              this.props.route.params.username
            );
          })
          .then(plantInfo => {
            this.camera.resumePreview();
            console.log(plantInfo);
            this.setState({ plantInfo });
          })
          .then(() => {
            this.props.navigation.navigate("PlantPage", {
              justScanned: true,
              isInGarden: false,
              plantInfo: this.state.plantInfo,
              plantImage: this.state.plantImage,
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
        base64: true,
      })
        .then(result => {
          if (result.cancelled === false) {
            this.setState({ plantImage: result.uri });
            return api.getPlantById(
              result.base64,
              this.props.route.params.username
            );
          } else {
            return Promise.reject("cancelled");
          }
        })
        .then(plantInfo => {
          this.setState({ plantInfo });
        })
        .then(() => {
          this.props.navigation.navigate("PlantPage", {
            isInGarden: false,
            plantInfo: this.state.plantInfo,
            plantImage: this.state.plantImage,
          });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  onSearch = searchText => {
    return new Promise((resolve, reject) => {
      resolve(
        api.getScientificName(
          searchText.toLowerCase(),
          this.props.route.params.username
        )
      );
    })
      .then(plantInfo => {
        this.setState({ plantInfo });
      })
      .then(() => {
        this.props.navigation.navigate("PlantPage", {
          plantInfo: this.state.plantInfo,
          isInGarden: false,
          plantImage: this.state.plantImage,
        });
      });
  };

  toggleSearch = () => {
    this.setState(currentState => {
      return { searchVisible: !currentState.searchVisible };
    });
  };

  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null || hasPermission === false) {
      return (
        <View style={{ marginTop: 25 }}>
          <SearchBar
            onSearch={this.onSearch}
            toggleSearch={this.toggleSearch}
          />
          <Text>No access to camera or no permission</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("MyGarden")}
          >
            <FontAwesome
              name="leaf"
              style={{ color: "#719382", fontSize: 40, paddingBottom: 4 }}
            />
            <Text>Garden</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("UserPage")}
          >
            <MaterialCommunityIcons
              name="account"
              style={{ color: "#719382", fontSize: 45, marginBottom: -5.5 }}
            ></MaterialCommunityIcons>
            <Text>Account</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          {this.state.searchVisible && (
            <SearchBar
              onSearch={this.onSearch}
              toggleSearch={this.toggleSearch}
            />
          )}

          <Camera
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.camera}
          ></Camera>
          <View style={styles.iconContainer}>
            <Image
              source={require("./graphics/Background.jpg")}
              style={styles.backgroundImage}
            ></Image>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MyGarden")}
            >
              <FontAwesome
                name="leaf"
                style={{ color: "#719382", fontSize: 40, paddingBottom: 4 }}
              />
              <Text>Garden</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.toggleSearch()}>
              <FontAwesome
                name="search"
                style={{ color: "#719382", fontSize: 40, paddingBottom: 4 }}
              />
              <Text>Search</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={() => this.takePicture()}
            >
              <FontAwesome
                name="camera"
                style={{ color: "#719382", fontSize: 40, paddingBottom: 4 }}
              />
              <Text> Snap!</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.library}
              onPress={() => this.pickImage()}
            >
              <Ionicons
                name="ios-photos"
                style={{ color: "#719382", fontSize: 40, paddingLeft: 4 }}
              />
              <Text>Library</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("UserPage")}
            >
              <MaterialCommunityIcons
                name="account"
                style={{ color: "#719382", fontSize: 45, marginBottom: -5.5 }}
              ></MaterialCommunityIcons>
              <Text>Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

export default CameraPage;

const styles = StyleSheet.create({
  library: {
    backgroundColor: "transparent",
  },
  cameraIcon: {
    backgroundColor: "transparent",
  },
  iconContainer: {
    flex: 1,
    flexDirection: "row",
    height: "10%",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
  camera: {
    flex: 8,
    zIndex: -1000,
  },
});
