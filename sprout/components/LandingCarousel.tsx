import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";

interface Props {
  navigation: any;
}

const slides = [
  {
    key: "somethun",
    title: "Title 1",
    text: "Description.\nSay something cool",
    backgroundColor: "#59b2ab"
  },
  {
    key: "somethun-dos",
    title: "Title 2",
    text: "Other cool stuff",
    backgroundColor: "#febe29"
  },
  {
    key: "somethun1",
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",

    backgroundColor: "#22bcb5"
  }
];

export default class LandingCarousel extends React.Component<Props> {
  state = {
    showRealApp: false
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
    this.props.navigation.navigate("Login");
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
      />
    );
  }
}
