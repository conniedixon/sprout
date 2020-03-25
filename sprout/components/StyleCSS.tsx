import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "patrick-hand-sc",
    fontSize: 14,
    textAlign: "center",
  },
  textItalic: {
    fontFamily: "Roboto",
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "200",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#aebb8f",
    color: "white",
    fontSize: 15,
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    justifyContent: "space-around",
    margin: 3,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
  subheader: {
    fontSize: 20,
    textAlign: "center",
    fontStyle: "italic",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
});

export default styles;
