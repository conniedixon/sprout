/** @format */

import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Linking,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";

import PlantCard from "../components/PlantCard";
import { getUserWishlist } from "../components/spec/index";
import PlantMap from "./PlantMap";

interface Props {
  navigation: any;
  route: any;
}
let { height, width } = Dimensions.get("window");

class Wishlist extends Component<Props> {
  state = {
    wishlist: [],
  };
  componentDidMount() {
    getUserWishlist(this.props.route.params.username).then(wishlist => {
      this.setState({ wishlist });
    });
  }

  render() {
    const uniqueWishlist = Array.from(
      new Set(this.state.wishlist.map(a => a.commonName))
    ).map(id => {
      return this.state.wishlist.find(a => a.commonName === id);
    });
    return (
      <View style={styles.container}>
        <Image
          source={require("./graphics/1585050155337_Untitled_Artwork.jpg")}
          style={styles.backgroundImage}
        ></Image>
        <Text style={styles.text}>My Wishlist</Text>
        <View style={styles.wishlistInfo}>
          {uniqueWishlist.map(plant => {
            return (
              <View>
                {/* <Image
                  style={{ width: 10, height: 10 }}
                  source={{ uri: plant.images[0].url }}
                /> */}

                <Text style={styles.wishlistText}>
                  <MaterialCommunityIcons
                    name="flower"
                    size={20}
                    color="#719382"
                  />{" "}
                  {plant.commonName}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.text2}>Find garden centres</Text>
        <View style={styles.map}>
          <PlantMap />
        </View>
      </View>
    );
  }
}

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // inner items will be added vertically
    flex: 1, // all the available vertical space will be occupied by it
    justifyContent: "space-between",
    height: height,
    backgroundColor: "#ffffff",
  },
  map: {
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  text: {
    marginTop: 8,
    marginLeft: 12,
    fontFamily: "Verdana",
    fontSize: 20,
    fontWeight: "500",
  },
  text2: {
    marginLeft: 14,
    marginTop: -20,
    fontFamily: "Verdana",
    fontSize: 20,
    fontWeight: "500",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
  },
  wishlistInfo: {
    marginLeft: 12,
    marginTop: 15,
    flex: 1,
  },
  wishlistText: {
    fontSize: 16,
    fontFamily: "Verdana",
    lineHeight: 25,
  },
});
