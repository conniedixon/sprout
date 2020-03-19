import React from "react";
import { TextInput, View, Button, Text } from "react-native";

const ConfirmEmail = ({ username, updateCode, sumbitCode }) => {
  return (
    <View
      style={{ alignItems: "center", height: 300, justifyContent: "center" }}
    >
      <Text>A confirmation email has been sent to {username}</Text>
      <TextInput
        placeholder="Input verification code here"
        onChange={updateCode}
      />
      <Button title="Submit Code" onPress={submitCode} />
    </View>
  );
};

export default ConfirmEmail;
