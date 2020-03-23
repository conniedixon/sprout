/** @format */

import { Image } from "react-native";
import React, { Component } from "react";

interface Props {
  trafficlight: any;
}

class Watering extends Component<Props> {
  render() {
    console.log(this.props.trafficlight);
    if (this.props.trafficlight === "red") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Hard.jpg")}
        />
      );
    } else if (this.props.trafficlight === "green") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Easy.jpg")}
        />
      );
    } else {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Medium.jpg")}
        />
      );
    }
  }
}

export default Watering;
