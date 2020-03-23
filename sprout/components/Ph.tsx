/** @format */

import { View, Text, Image, Alert } from "react-native";
import React, { Component } from "react";

interface Props {
  ph: any;
}

class Ph extends Component<Props> {
  render() {
    if (this.props.ph < 5.5) {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Acidoph.jpg")}
        />
      );
    } else if (this.props.ph > 10.5) {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Alkaline_Ph.jpg")}
        />
      );
    } else {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Neutral_Ph.jpg")}
        />
      );
    }
  }
}

export default Ph;
