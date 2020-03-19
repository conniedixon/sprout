import React from "react";
import { TextInput, View, Button, Text } from "react-native";

const SignIn = ({ signIn, updateUsername, updatePassword, setNewUser }) => {
  return (
    <View
      style={{ alignItems: "center", height: 300, justifyContent: "center" }}
    >
      <TextInput placeholder="Type your email here" onChange={updateUsername} />
      <TextInput
        onChange={updatePassword}
        secureTextEntry={true}
        placeholder="Type your password here"
      />
      <Button title="Sign In" onPress={signIn} />

      <Text onPress={setNewUser}>Create a new account</Text>
    </View>
  );
};

export default SignIn;
