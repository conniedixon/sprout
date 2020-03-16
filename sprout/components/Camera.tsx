/** @format */
import 'react-native-gesture-handler';
import { Component } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

// import { StackNavigator } from 'react-navigation';

interface Props {
  navigation: any;
}

class Camera extends Component<Props> {
  render() {
    return (
      <View>
        <Text>Camera Here</Text>
        <Button
          title='Go to Details'
          onPress={() => this.props.navigation.navigate('MyGarden')}
        />
      </View>
    );
  }
}

export default Camera;
