/** @format */

import React, { Component } from "react";
import { Authenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";

import ValidationErrorMessage from "./ValidationErrorMessage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

interface Props {
  navigation: any;
  authenticateUser: any;
  route: any;
}

class Login extends Component<Props> {
  state = {
    newUser: false,
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

  handleValidationError = message => {
    this.setState({ validationError: { errorExists: true, message } });
  };

  setNewUser = () => {
    this.setState({ newUser: true });
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

  render() {
    const { errorExists, message } = this.state.validationError;
    const { newUser } = this.state;
    return (
      <>
        {!newUser && (
          <SignIn
            signIn={this.signIn}
            updatePassword={this.updatePassword}
            updateUsername={this.updateUsername}
            setNewUser={this.setNewUser}
          />
        )}
        {newUser && (
          <SignUp
            signUp={this.signUp}
            updatePassword={this.updatePassword}
            updateUsername={this.updateUsername}
            updateConfirmedPassword={this.updateConfirmedPassword}
          />
        )}
        {errorExists && (
          <ValidationErrorMessage>{message}</ValidationErrorMessage>
        )}
      </>
    );
  }
}

export default Login;
