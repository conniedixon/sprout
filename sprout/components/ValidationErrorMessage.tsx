import React from "react";
import { Text } from "react-native";

const ValidationErrorMessage = string => {
  return <Text style={{ color: "red" }}>{string}</Text>;
};

export default ValidationErrorMessage;
