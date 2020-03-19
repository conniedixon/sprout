import React from "react";
import { TextInput, View, Button, Text } from "react-native";

const SignUp = ({
  updatePassword,
  updateUsername,
  updateConfirmedPassword,
  signUp
}) => {
  return (
    <View
      style={{ alignItems: "center", height: 300, justifyContent: "center" }}
    >
      <TextInput placeholder="Type your email here" onChange={updateUsername} />
      <TextInput
        onChange={updatePassword}
        secureTextEntry={true}
        placeholder="Type new password here"
      />
      <TextInput
        onChange={updateConfirmedPassword}
        secureTextEntry={true}
        placeholder="Confirm password"
      />
      <Button title="Sign Up!" onPress={this.signUp} />
    </View>
  );
};

export default SignUp;
