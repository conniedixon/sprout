import React from "react";
import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "#aebb8f",
  },
  image: {
    flex: 1,
    height: 600,
    width: 400,
    right: -23,
  },
});

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            "https://cdn.discordapp.com/attachments/691559212395921421/692345843499532318/Loading-Screen.GIF",
        }}
        style={styles.image}
      />
    </View>
  );
};

export default LoadingScreen;
