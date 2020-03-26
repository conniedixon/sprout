import React from "react";
import {
  TextInput,
  View,
  Text,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUp = ({ route: { params }, navigation }) => {
  const styles = params.styles;
  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={require("./graphics/login_logo.png")}
        style={styles.logo}
      />
      <View style={styles.inputView}>
        <TextInput
          placeholder="Type your username here"
          onChange={params.updateUsername}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Type your email here"
          onChange={params.updateEmail}
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          onChange={params.updatePassword}
          secureTextEntry={true}
          placeholder="Type new password here"
          style={styles.inputText}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          onChange={params.updateConfirmedPassword}
          secureTextEntry={true}
          placeholder="Confirm password"
          style={styles.inputText}
        />
      </View>
      <TouchableOpacity onPress={params.signUp} style={styles.loginBtn}>
        <Text style={styles.text}>Create Account</Text>
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

export default SignUp;
