import React from "react";
import { TextInput, View, Button, Text, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#719382",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#ffffff",
  },
  logo: {
    flex: 1,
    resizeMode: "contain",
    width: 300,
    height: 480,
    alignSelf: "center",
  },
});

const SignIn = ({ route: { params }, navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("./graphics/Logo.jpg")} style={styles.logo} />
      <View style={styles.inputView}>
        <TextInput
          placeholder="Type your username here"
          onChange={params.updateUsername}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          onChange={params.updatePassword}
          secureTextEntry={true}
          placeholder="Type your password here"
          style={styles.inputText}
        />
      </View>
      <View>
        <Button title="Sign In" onPress={params.signIn} />
      </View>
      <Text
        onPress={() => {
          navigation.navigate("Sign Up");
        }}
      >
        Create a new account
      </Text>
    </View>
  );
};

export default SignIn;
