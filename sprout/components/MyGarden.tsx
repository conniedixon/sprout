/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PlantCard from '../components/PlantCard';

class MyGarden extends Component {
  state = {
    myPlants: [],
    myScannedPlants: []
  };
  render() {
    return (
      <View>
        <Text>MyGarden</Text>
        <PlantCard />
      </View>
    );
  }
}

export default MyGarden;
