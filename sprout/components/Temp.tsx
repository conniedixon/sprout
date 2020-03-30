/** @format */

import { Image } from "react-native";
import React, { Component } from "react";

interface Props {
  temp: any;
}

class Temp extends Component<Props> {
  render() {
    if (this.props.temp < 0) {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Low.jpg")}
        />
      );
    } else if (this.props.temp < 10) {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Medlow_.jpg")}
        />
      );
    } else if (this.props.temp < 20) {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Med.jpg")}
        />
      );
    } else if (this.props.temp < 30) {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Medhigh_.jpg")}
        />
      );
    } else {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/High.jpg")}
        />
      );
    }
  }
}

export default Temp;
