/** @format */


import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PlantCard from '../components/PlantCard';
import { getUserWishlist } from '../components/spec/index';
import PlantMap from "./PlantMap";

interface Props {
  navigation: any;
  route: any;
}

class Wishlist extends Component<Props> {
  state = {
    wishlist: []
  };
  componentDidMount() {
    getUserWishlist(this.props.route.params.username).then(wishlist => {
      this.setState({ wishlist });
    });
  }
  render() {

    return (
      <View>
        <Text>My Wishlist</Text>
        <Text>Tap on a plant to see details and add to your Garden</Text> 
        <PlantMap />


        {this.state.wishlist.map(plant => {
          return (
            <PlantCard
              plantInfo={plant}
              navigation={this.props.navigation}
              isInGarden={'isInWishlist'}
            />
          );
        })}
      </View>
    );
    //   }
  }
}

export default Wishlist;
