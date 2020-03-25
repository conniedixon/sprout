import React from "react";
import { StyleSheet } from "react-native";

// "patrick-hand-sc": require("./assets/fonts/Patrick_Hand_SC/PatrickHandSC-Regular.ttf"),
//       "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
//       "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
//       "roboto-italic

const styles = StyleSheet.create({
  topMargin: {
    marginTop: 25,
  },
  text: {
    fontFamily: "roboto-regular",
    fontSize: 14,
    textAlign: "center",
  },
  textItalic: {
    fontFamily: "roboto-italic",
    fontSize: 14,
    textAlign: "center",
  },
  subHeader: {
    fontFamily: "roboto-bold",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  button: {
    backgroundColor: "#aebb8f",
    color: "white",
    fontSize: 15,
    fontFamily: "roboto-regular",
    textAlign: "center",
    alignSelf: "center",
    width: "50%",
    justifyContent: "space-around",
    margin: 3,
    borderRadius: 5,
  },
  pageheader: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "patrick-hand-sc",
  },
  header2: {
    fontSize: 27,
    textAlign: "center",
    fontFamily: "patrick-hand-sc",
    padding: 0,
  },
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  plantCard: {
    height: 370,
    width: 350,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rowscontainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  map: {
    marginTop: 15,
    marginBottom: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  wishlistcontainer: {
    height: 100,
  },
});

export default styles;
