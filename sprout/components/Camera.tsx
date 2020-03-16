/** @format */
import 'react-native-gesture-handler';
import { Component } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

interface Props {
  navigation: any;
}

class Camera extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Camera Here</Text>
        <Button
          title='Go to My Garden'
          onPress={() => this.props.navigation.navigate('MyGarden')}
        />
        <Button
          title='Go to My Account'
          onPress={() => this.props.navigation.navigate('UserPage')}
        />
      </View>
    );
  }
}

export default Camera;
