/** @format */

import React, { Component } from "react";
import { Authenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import { TextInput, View, Button } from "react-native";
import ValidationErrorMessage from "./ValidationErrorMessage";

interface Props {
  navigation: any;
}

class Login extends Component<Props> {
  state = {
    username: "",
    password: "",
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

  signUp = () => {
    const { username, password } = this.state;
    Auth.signUp({
      username,
      password,
      attributes: {
        email: username
      }
    })
      .then(() => this.props.navigation.navigate("ConfirmEmail"))
      .catch(({ message }) => {
        this.setState({ validationError: { errorExists: true, message } });
      });
  };

  render() {
    const { errorExists, message } = this.state.validationError;
    return (
      <View
        style={{ alignItems: "center", height: 300, justifyContent: "center" }}
      >
        <TextInput
          placeholder="Type your email here"
          onChange={this.updateUsername}
        />
        <TextInput
          onChange={this.updatePassword}
          secureTextEntry={true}
          placeholder="Type your password here"
        />
        <Button title="Sign Up!" onPress={this.signUp} />
        {this.state.validationError.errorExists && (
          <ValidationErrorMessage>{message}</ValidationErrorMessage>
        )}
      </View>
    );
  }
}

export default Login;
