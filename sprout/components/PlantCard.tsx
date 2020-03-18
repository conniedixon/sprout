/** @format */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  plantInfo: any;
  navigation: any;
}

class PlantCard extends Component<Props> {
  state = {
    isLoading: false
  };

  render() {
    if (this.state.isLoading) return 'Loading...';
    const {
      commonName,
      ph,
      lightLevel,
      minTemp,
      wateringSchedule
    } = this.props.plantInfo;
    return (
      <View>
        <Text>{commonName}</Text>
        <Text>
          ph:{ph}, lightLevel:{lightLevel}, minTemp:{minTemp}
        </Text>
        <Text>watering schedule: {wateringSchedule}</Text>
        <Text>Planted: (date here!)</Text>
        <Button
          title='View full details'
          onPress={() =>
            this.props.navigation.navigate('PlantPage', {
              plantInfo: this.props.plantInfo
            })
          }
        />
      </View>
      //set reminder to water
      //delete
      //edit values and picture
      //add date and image from BEN
    );
  }
}

export default PlantCard;
