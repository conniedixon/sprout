/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PlantCard from '../components/PlantCard';

interface Props {
  plantInfo: any;
  navigation: any;
}

class MyGarden extends Component<Props> {
  state = {
    myPlants: [],
    myScannedPlants: []
  };
  render() {
    return (
      <View>
        <Text>MyGarden</Text>
        {this.state.myPlants.map(plant => {
          return <PlantCard plantInfo={this.props.plantInfo} />;
        })}
      </View>
    );
  }
}

export default MyGarden;
