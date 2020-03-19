/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PlantCard from '../components/PlantCard';

interface Props {
  navigation: any;
}

class Wishlist extends Component<Props> {
  state = {
    wishedPlants: [
      {
        commonName: 'bottle-palm',
        difficulty: 'green',
        duration: 'n/a',
        family: 'Lily family',
        lightLevel: 'Medium',
        minTemp: 15,
        ph: 6.5,
        precipitation: 70,
        scientificName: 'Beaucarnea recurvata',
        wateringSchedule: 'medium: once a week'
      }
    ]
  };
  render() {
    return (
      <View>
        <Text>MyGarden</Text>
        {this.state.wishedPlants.map(plant => {
          return (
            <PlantCard plantInfo={plant} navigation={this.props.navigation} />
          );
        })}
      </View>
    );
  }
}

export default Wishlist;
