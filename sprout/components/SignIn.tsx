import React from "react";
import { TextInput, View, Button, Text } from "react-native";

const SignIn = ({ route: { params }, navigation }) => {
  return (
    <View
      style={{ alignItems: "center", height: 300, justifyContent: "center" }}
    >
      <TextInput
        placeholder="Type your username here"
        onChange={params.updateUsername}
      />
      <TextInput
        onChange={params.updatePassword}
        secureTextEntry={true}
        placeholder="Type your password here"
      />
      <Button title="Sign In" onPress={params.signIn} />

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
