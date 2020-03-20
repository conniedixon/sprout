/** @format */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import PlantCard from '../components/PlantCard';
import { getUserWishlist } from '../components/spec/index';

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
    // if (this.state.wishlist.length === 0) {
    //   return (
    //     <View>
    //       <Text>Add Plants to your Wishlist to see them here!</Text>
    //     </View>
    //   );
    // } else {
    return (
      <View>
        <Text>My Wishlist</Text>
        <Text>Tap on a plant to see details and add to your Garden</Text>

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
