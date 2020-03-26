import React from "react";
import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const ConfirmEmail = ({ route: { params }, navigation }) => {
  const { styles, email, submitCode } = params;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("./graphics/login_logo.png")}
        style={styles.logo}
      />
      <Text style={styles.text}>
        {`We've sent a confirmation code to ${email}`}{" "}
      </Text>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Input verification code here"
          onChange={params.updateCode}
          style={styles.inputText}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={submitCode}>
        <Text>Submit Code</Text>
      </TouchableOpacity>
      <Text
        style={styles.link}
        onPress={() => {
          navigation.navigate("Sign In");
        }}
      >
        I already have an account
      </Text>
      <View style={{ height: 60 }} />
    </KeyboardAvoidingView>
  );
};

export default ConfirmEmail;
