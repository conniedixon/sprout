/** @format */

import { Image } from "react-native";
import React, { Component } from "react";

interface Props {
  watering: any;
}

class Watering extends Component<Props> {
  render() {
    console.log(this.props.watering);
    if (this.props.watering === "Once a month") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Rare.jpg")}
        />
      );
    } else if (this.props.watering === "Twice a month") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Rare.jpg")}
        />
      );
    } else if (this.props.watering === "Once a week") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Not_Frequent.jpg")}
        />
      );
    } else if (this.props.watering === "Once every five days") {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Frequent_.jpg")}
        />
      );
    } else {
      return (
        <Image
          style={{ width: 50, height: 50 }}
          source={require("./graphics/Frequent_.jpg")}
        />
      );
    }
  }
}

export default Watering;
