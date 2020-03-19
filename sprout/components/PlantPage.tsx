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
  // const AsyncAlert = async () =>
  //   new Promise((resolve, reject) => {
  //     Alert.alert(
  //       'Added to plant garden',
  //       ' ',
  //       [
  //         { text: 'Go to my Garden', onPress: navigation.navigate('MyGarden') },
  //         { text: 'Scan Again', onPress: navigation.navigate('CameraPage') }
  //       ],
  //       { cancelable: false }
  //     );
  //   });

  // const addToGarden = () => {
  //   addPlantToGarden(plantInfo, 'tsting for map stuff');
  //   // AsyncAlert();
  // };

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
      <Button
        title='Add to My Garden'
        onPress={() => addPlantToGarden(plantInfo, 'conniedixon106@gmail.com')}
      />
      <Button
        title='Scan Again'
        onPress={() => navigation.navigate('CameraPage')}
      />
    </View>
  );
};

export default PlantPage;
