/** @format */

import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import MedalsPage from './MedalsPage';
import { getUser } from '../components/spec/index';

interface Props {
  navigation: any;
}

class UserPage extends Component<Props> {
  state = {
    isLoading: false,
    username: '',
    userMedals: [],
    scannedPlants: [],
    wishlist: []
  };

  componentDidMount() {
    getUser('conniedixon106@gmail.com').then(userData => {
      console.log(userData);
      this.setState(() => {
        return {
          username: userData.username,
          userMedals: userData.medals,
          scannedPlants: userData.userScannedPlants,
          wishlist: userData.wishlist
        };
      });
    });
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
              scannedPlants: this.state.scannedPlants
            })
          }></Button>
        <Button
          title='Go To My Wishlist'
          onPress={() =>
            this.props.navigation.navigate('Wishlist', {
              wishlist: this.state.wishlist
            })
          }></Button>
        <MedalsPage userMedals={this.state.userMedals} />
      </View>
    );
  }
  //change my name and password
  //see my wishlist
  //
}

export default UserPage;
