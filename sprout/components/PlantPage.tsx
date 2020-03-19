/** @format */
import React from 'react';
import { Text, View, Button, Image, Alert } from 'react-native';
import ImageCarousel from './ImageCarousel';
import { addPlantToGarden } from './spec/index';

const PlantPage = ({ route, navigation }) => {
  const { plantInfo, plantImage } = route.params;
  const images = {
    images: [{ url: plantImage }, plantInfo.images]
  };

  const addToGarden = () => {
    addPlantToGarden(plantInfo, 'tsting for map stuff').then(this.alerted);
  };

  const alerted = Alert.alert(
    'QRCode detected',
    'Do you like to run the QRCode?',
    [
      { text: 'No', onPress: navigation.navigate('CameraPage') },
      { text: 'Yes', onPress: navigation.navigate('CameraPage') }
    ],
    { cancelable: false }
  );

  return (
    <View>
      <ImageCarousel images={images} />

      <Text>
        {plantInfo.commonName}, {plantInfo.scientificName},Duration:{' '}
        {plantInfo.duration}, Family: {plantInfo.family}, Difficulty:{' '}
        {plantInfo.difficulty}, Care Instructions: Light level:{' '}
        {plantInfo.lightLevel}, Soil pH: {plantInfo.ph}, Watering Needs:{' '}
        {plantInfo.wateringSchedule}
      </Text>
      <Button title='Add to My Garden' onPress={() => this.addToGarden()} />
      <Button
        title='Scan Again'
        onPress={() => navigation.navigate('CameraPage')}
      />
    </View>
  );
};

export default PlantPage;
