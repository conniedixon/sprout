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
        wateringSchedule: 'medium: once a week',
        images: [
          {
            url:
              'https://upload.wikimedia.org/wikipedia/commons/9/96/2006-12-09Chlorophytum07-03.jpg'
          },
          {
            url:
              'https://upload.wikimedia.org/wikipedia/commons/2/23/2007-06-24Chlorophytum_comosum04.jpg'
          }
        ]
      }
    ]
  };
  render() {
    return (
      <View>
        <Text>My Wishlist</Text>
        <Text>Tap on a plant to see details and add to your Garden</Text>
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
