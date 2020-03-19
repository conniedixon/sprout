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
  authenticateUser: any;
  route: any;
}

class Login extends Component<Props> {
  state = {
    username: "",
    password: "",
    confirmedPassword: "",
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
          console.log(user);
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
        console.log(this.props);
        this.props.route.params.authenticateUser(username);
      })
      .catch(({ message }) => {
        this.setState({ validationError: { errorExists: true, message } });
      });
  };

  params = {
    signIn: this.signIn,
    updatePassword: this.updatePassword,
    updateUsername: this.updateUsername
  };

  render() {
    const { errorExists, message } = this.state.validationError;
    return (
      <>
        <NavigationContainer>
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
            <Stack.Screen name="Confirm Email" component={ConfirmEmail} />
          </Stack.Navigator>
        </NavigationContainer>
        {errorExists && (
          <ValidationErrorMessage>{message}</ValidationErrorMessage>
        )}
      </>
    );
  }
}

export default Login;
