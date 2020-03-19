/** @format */

import React, { Component } from "react";
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

class Login extends Component<Props> {
  state = {
    username: "",
    password: "",
    confirmedPassword: "",
    code: "",
    validationError: {
      errorExists: false,
      message: ""
    }
  };

  updateUsername = ({ nativeEvent: { text } }) => {
    this.setState({ username: text });
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
    const { username, password, confirmedPassword } = this.state;
    if (password === confirmedPassword) {
      Auth.signUp({
        username,
        password,
        attributes: {
          email: username
        }
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
      password
    })
      .then(({ username }) => {
        this.props.route.params.authenticateUser(username);
      })
      .catch(({ message }) => {
        this.setState({ validationError: { errorExists: true, message } });
      });
  };

  submitCode = () => {
    const { username, code } = this.state;
    Auth.confirmSignUp(username, code).then(data => {
      console.log(data);
      this.props.route.params.authenticateUser(username);
    });
  };

  params = {
    signIn: this.signIn,
    updatePassword: this.updatePassword,
    updateUsername: this.updateUsername,
    updateConfirmedPassword: this.updateConfirmedPassword,
    signUp: this.signUp,
    updateCode: this.updateCode,
    submitCode: this.submitCode
  };

  render() {
    const { errorExists, message } = this.state.validationError;
    return (
      <>
        <Stack.Navigator>
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
            initialParams={this.params}
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
