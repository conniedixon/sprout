/** @format */

import React, { Component } from 'react';
import { View, Text } from 'react-native';

interface Props {
  plantInfo: any;
  navigation: any;
}

class ScannedPlants extends Component<Props> {
  render() {
    return (
      <View>
        <Text>My Scanned Plants:</Text>
      </View>
    );
  }
}

export default ScannedPlants;
