/** @format */

import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Authenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ValidationErrorMessage from "./ValidationErrorMessage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ConfirmEmail from "./ConfirmEmail";

const Stack = createStackNavigator();

interface Props {
  navigation: any;
  route: any;
}

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
    fontSize: 15,
  },
  logo: {
    flexBasis: "30%",
    paddingBottom: 15,
    resizeMode: "center",
    width: 300,
    zIndex: -1000,
    alignSelf: "center",
    margin: 0,
  },
  loginBtn: {
    width: 170,
    backgroundColor: "#aebb8f",
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  link: {
    fontSize: 15,
    textDecorationLine: "underline",
  },
});

class Login extends Component<Props> {
  state = {
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
    code: "",
    validationError: {
      errorExists: false,
      message: "",
    },
  };

  updateUsername = ({ nativeEvent: { text } }) => {
    this.setState({ username: text });
  };
  updateEmail = ({ nativeEvent: { text } }) => {
    this.setState({ email: text });
  };

  updatePassword = ({ nativeEvent: { text } }) => {
    this.setState({ password: text });
  };

  updateConfirmedPassword = ({ nativeEvent: { text } }) => {
    this.setState({ confirmedPassword: text });
  };

  updateCode = ({ nativeEvent: { text } }) => {
    this.setState({ code: text });
  };

  handleValidationError = message => {
    this.setState({ validationError: { errorExists: true, message } });
  };

  signUp = () => {
    const { username, password, confirmedPassword, email } = this.state;
    if (password === confirmedPassword) {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: email,
        },
      })
        .then(({ user }) => {
          this.props.navigation.navigate("Login", { screen: "Confirm Email" });
        })
        .catch(({ message }) => {
          this.handleValidationError(message);
        });
    } else {
      this.handleValidationError("Passwords do not match");
    }
  };

  signIn = () => {
    const { username, password } = this.state;
    Auth.signIn({
      username,
      password,
    })
      .then(({ username }) => {
        this.props.route.params.authenticateUser(username, false);
      })
      .catch(({ message }) => {
        this.setState({ validationError: { errorExists: true, message } });
      });
  };

  submitCode = () => {
    const { username, code } = this.state;
    Auth.confirmSignUp(username, code).then(() => {
      this.props.route.params.authenticateUser(username, true);
    });
  };

  params = {
    signIn: this.signIn,
    updatePassword: this.updatePassword,
    updateUsername: this.updateUsername,
    updateEmail: this.updateEmail,
    updateConfirmedPassword: this.updateConfirmedPassword,
    signUp: this.signUp,
    updateCode: this.updateCode,
    submitCode: this.submitCode,
    styles: styles,
    validationError: this.state.validationError,
  };
  static navigationOptions = { header: null };
  render() {
    const { errorExists, message } = this.state.validationError;
    return (
      <>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Sign In"
        >
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            initialParams={this.params}
          />
          <Stack.Screen
            name="Sign Up"
            component={SignUp}
            initialParams={this.params}
          />
          <Stack.Screen
            name="Confirm Email"
            component={ConfirmEmail}
            initialParams={{ ...this.params, email: this.state.email }}
          />
        </Stack.Navigator>
        {errorExists && (
          <ValidationErrorMessage>{message}</ValidationErrorMessage>
        )}
      </>
    );
  }
}

export default Login;
