import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { Image, StyleSheet, View } from "react-native";

interface Props {
  navigation: any;
  route: any;
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 320,
    height: 480,
    alignSelf: "center",
  },
});

const slides = [
  {
    key: "slide-1",
    title: "Scan a plant",
    text: "...or upload from camera roll",
    image: require("./graphics/Slide-1.jpg"),
  },
  {
    key: "slide-2",
    title: "Add to your garden",
    text: "...to keep a track of your plants",
    image: require("./graphics/Slide-2.jpg"),
  },
  {
    key: "slide-3",
    title: "Keep scanning",
    text: "...and adding plants to your garden to earn medals",
    image: require("./graphics/Slide-3.jpg"),
  },
];

export default class LandingCarousel extends React.Component<Props> {
  state = {
    showRealApp: false,
  };

  _renderItem = ({ item }) => {
    return (
      <View>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
        <Image source={item.image} style={styles.image} />
      </View>
    );
  };

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: "transparent" }}
        />
      </View>
    );
  };

  _onDone = () => {
    this.setState({ showRealApp: true });
    this.props.navigation.navigate("CameraPage");
  };

  _onSkip = () => {
    this.setState({ showRealApp: true });
    this.props.navigation.navigate("CameraPage");
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        showSkipButton={true}
        onSkip={this._onSkip}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}
