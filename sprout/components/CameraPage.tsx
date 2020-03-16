/** @format */
import 'react-native-gesture-handler';
import { Component } from 'react';
import * as React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';

interface Props {
  navigation: any;
}

class CameraPage extends Component<Props> {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back
  };

  camera: Camera | null = null;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
    }
  };

  render() {
    const { hasPermission } = this.state;

    if (hasPermission === null) {
      return (
        <View>
          <Button
            title='Go to My Garden'
            onPress={() => this.props.navigation.navigate('MyGarden')}
          />
          <Button
            title='Go to My Account'
            onPress={() => this.props.navigation.navigate('UserPage')}
          />
        </View>
      );
    } else if (hasPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
          <Button
            title='Go to My Garden'
            onPress={() => this.props.navigation.navigate('MyGarden')}
          />
          <Button
            title='Go to My Account'
            onPress={() => this.props.navigation.navigate('UserPage')}
          />
        </View>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              camera = ref;
            }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }}
              onPress={() => this.takePicture()}>
              <FontAwesome
                name='camera'
                style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
          </Camera>
          <Button
            title='Go to My Garden'
            onPress={() => this.props.navigation.navigate('MyGarden')}
          />
          <Button
            title='Go to My Account'
            onPress={() => this.props.navigation.navigate('UserPage')}
          />
        </View>
      );
    }
  }
}

export default CameraPage;
