/** @format */

import { Image } from "react-native";
import React, { Component } from "react";

interface Props {
  lightlevel: any;
}

class LightLevel extends Component<Props> {
  render() {
    if (this.props.lightlevel === "Low") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Low_1.jpg")}
        />
      );
    } else if (this.props.lightlevel === "Medium") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Medium_1.jpg")}
        />
      );
    } else {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/High_1.jpg")}
        />
      );
    }
  }
}

export default LightLevel;
