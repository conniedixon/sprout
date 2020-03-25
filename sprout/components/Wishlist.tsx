/** @format */

import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import { Text, View, Dimensions, Image, ImageBackground } from "react-native";

import PlantCard from "../components/PlantCard";
import { getUserWishlist } from "../components/spec/index";
import PlantMap from "./PlantMap";
import styles from "./StyleCSS";
import * as Animatable from "react-native-animatable";

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
    return (
        <Animatable.View animation="fadeInUpBig" style={styles.topMargin}>
        <ImageBackground
          source={require("./graphics/Background.jpg")}
          style={styles.backgroundImage}
        >
          <Text style={styles.pageheader}>My Wishlist</Text>
          <Text style={styles.textItalic}>
            Select a plant to see more information or add to Your Garden
          </Text>
          <View style={styles.wishlistcontainer}>
            {this.state.wishlist.map(plant => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("PlantPage", {
                      plantInfo: plant,
                      isInGarden: "isInWishlist",
                    })
                  }
                >
                  <Text>
                    <MaterialCommunityIcons
                      name="flower"
                      size={20}
                      color="#719382"
                    />{" "}
                    {plant.commonName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.textItalic}>Find garden centres near you:</Text>
          <View style={styles.map}>
            <PlantMap />
          </View>
        </ImageBackground>
      </Animatable.View>

    );
  }
}

export default Wishlist;
