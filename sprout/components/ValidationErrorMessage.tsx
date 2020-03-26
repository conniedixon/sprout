/** @format */

import React from "react";
import { Text } from "react-native";

const ValidationErrorMessage = props => {
  return <Text style={{ color: "red" }}>{props.children}</Text>;
};

export default ValidationErrorMessage;
