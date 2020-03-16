/** @format */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
export default class App extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    result: null,
    rollGranted: false
  };
  async componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    // Camera roll Permission
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status === 'granted') {
        this.setState({ rollGranted: true });
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === 'granted') {
      this.setState({ hasPermission: status === 'granted' });
    }
  };
  handleCameraType = () => {
    const { cameraType } = this.state;
    this.setState({
      cameraType:
        cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
    });
  };
  takePicture = async () => {
    console.log('picture taken');
    if (this.camera) {
      const options = { base64: true };
      let photo = await this.camera.takePictureAsync(options);
      const asset = await MediaLibrary.saveToLibraryAsync(photo.uri);
      var url = 'https://api.plant.id/v2/identify';
      var headers = {
        'Content-Type': 'application/json',
        'Api-Key': 'oEk029eOZyIto6lZoAWI4WKqVxPiV4Tt6Dl3JMIGDOXQ3V3Uu9'
      };
      //put data in an array and stringigy the data in the body object
      var data = { images: [photo.base64] };
      fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
      })
        .then(res => {
          // console.log(res, "res");
          return res.json();
        })
        .then(json => {
          console.log(json, 'json');
        });
    }
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result, 'result');
    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={ref => {
              this.camera = ref;
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 30
              }}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.pickImage()}>
                <Ionicons
                  name='ios-photos'
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
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
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: 'transparent'
                }}
                onPress={() => this.handleCameraType()}>
                <MaterialCommunityIcons
                  name='camera-switch'
                  style={{ color: '#fff', fontSize: 40 }}
                />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }
}
