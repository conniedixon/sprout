/** @format */

import { View, Text, Image, Alert } from 'react-native';
import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as index from '../components/spec/index';

interface Props {
  userMedals: any;
}

class MedalsPage extends Component<Props> {
  state = {
    availableMedals: [
      'scannedOnePlant',
      'scannedTenPlants',
      'scannedFiftyPlants',
      'addedOnePlant',
      'addedTenPlants',
      'addedFiftyPlants'
    ],
    medalSlugs: {
      scannedOnePlant: 'Discoverer: Scanned One Plant',
      scannedTenPlants: 'Explorer: Scanned Ten Plants',
      scannedFiftyPlants: 'Adventurer: Scanned Fifty Plants',
      addedOnePlant: 'Plant Parent: Added your first plant to your Garden',
      addedTenPlants: 'Plant Pioneer: Added your tenth plant to your Garden',
      addedFiftyPlants:
        'Plant Hoarder: Added your fiftieth plant to your Garden'
    }
  };

  render() {
    return (
      <View>
        <Text>My Medals</Text>
        {this.state.availableMedals.map(medal => {
          if (this.props.userMedals.includes(medal)) {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert('Medal achieved!', this.state.medalSlugs[medal]);
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      'https://library.kissclipart.com/20180901/yaw/kissclipart-medal-png-grey-clipart-gold-medal-silver-medal-a2ba2dbfeb239b76.jpg'
                  }}
                />
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    'Medal not yet achieved',
                    'Keep scanning and adding plants to unlock this medal!'
                  );
                }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={{
                    uri:
                      'https://webstockreview.net/images/medal-clipart-platinum-13.png'
                  }}
                />
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  }
}

export default MedalsPage;
