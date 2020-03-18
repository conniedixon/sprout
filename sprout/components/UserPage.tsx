/** @format */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  navigation: any;
}

class UserPage extends Component<Props> {
  state = {
    isLoading: false,
    username: 'Connie',
    medals: [],
    scannedPlants: [
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
      },
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

  componentDidMount() {
    //make a call to AWS to get account details...
  }

  speciesCount = () => {
    let species = [];
    this.state.scannedPlants.map(plant => {
      if (!species.includes(plant.family)) {
        species.push(plant.family);
      }
    });
    return species.length;
  };

  render() {
    if (this.state.isLoading) return 'Loading...';
    return (
      <View>
        <Text>Welcome {this.state.username} </Text>
        <Text>Total Plants Scanned: {this.state.scannedPlants.length}</Text>
        <Text>Total Species Scanned: {this.speciesCount()}</Text>
        <Button
          title='See Scanned Plants'
          onPress={() =>
            this.props.navigation.navigate('ScannedPlants', {
              plants: this.state.scannedPlants
            })
          }></Button>
        {/* <ScannedPlantCard />
        <UserMedals /> */}
      </View>
    );
  }
}

export default UserPage;
