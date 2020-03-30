import React from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Image,
} from "react-native";

const SignIn = ({ route: { params }, navigation }) => {
  const styles = params.styles;
  return (
    <>
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
            onChange={params.updatePassword}
            secureTextEntry={true}
            placeholder="Type your password here"
            style={styles.inputText}
          />
        </View>
        <TouchableOpacity onPress={params.signIn} style={styles.loginBtn}>
          <Text style={styles.text}>Sign In</Text>
        </TouchableOpacity>

        <Text
          style={styles.link}
          onPress={() => {
            navigation.navigate("Sign Up");
          }}
        >
          Create a new account
        </Text>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;
