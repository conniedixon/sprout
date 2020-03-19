import React from "react";
import { TextInput, View, Button, Text } from "react-native";

const ConfirmEmail = ({ route: { params }, navigation }) => {
  return (
    <View
      style={{ alignItems: "center", height: 300, justifyContent: "center" }}
    >
      <Text>A confirmation email has been sent to your email address</Text>
      <TextInput
        placeholder="Input verification code here"
        onChange={params.updateCode}
      />
      <Button title="Submit Code" onPress={params.submitCode} />
    </View>
  );
};

export default ConfirmEmail;
