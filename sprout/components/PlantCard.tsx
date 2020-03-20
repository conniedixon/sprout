/** @format */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

interface Props {
  plantInfo: any;
  navigation: any;
  isInGarden: Boolean;
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
      wateringSchedule,
      images
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
              plantInfo: this.props.plantInfo,
              isInGarden: this.props.isInGarden
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
