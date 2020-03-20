/** @format */
import * as utils from './utils/utils';
import axios from 'axios';
import * as index from './components/spec/index';

export const getPlantById = (base64: any, username) => {
  console.log('in the api');
  const plantImg = { images: [base64] };
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': 'GRMGq6d2ttQjK7pM6JuMYb3pmLLMHySpZqX4fzvLFGc5bcS60r'
    }
  };
  return axios
    .post('https://api.plant.id/v2/identify', plantImg, axiosConfig)
    .then(({ data: { suggestions } }) => {
      const scientificName = suggestions[0].plant_details.scientific_name;

      return getPlantByName(scientificName, username);
    })
    .catch(err => {
      console.log(err);
    });
};

function getPlantByName(scientificName, username) {
  console.log('in the second function');

  return axios
    .get(
      `https://trefle.io/api/plants?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09&&scientific_name=${scientificName}`
    )
    .then(({ data }) => {
      const trefleId = data[0].id;
      return getSingularPlant(trefleId, username);
    })
    .catch(err => {
      console.log(err);
    });
}

function getSingularPlant(plantId, username) {
  console.log('in the third function');

  return axios
    .get(
      `https://trefle.io/api/plants/${plantId}?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      const plantFamilyId = data.main_species.sources[0].species_id;
      const plantData = {
        commonName: data.main_species.common_name,
        scientificName: data.scientific_name
      };
      return getCareInstructions(plantFamilyId, plantData, username);
    })
    .catch(err => {
      console.log(err);
    });
}

const getCareInstructions = (plantFamilyId, plantData, username) => {
  console.log('in the fourth function');

  return axios
    .get(
      `https://trefle.io/api/species/${plantFamilyId}?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      const plantImages = data.images;
      const careInstructions = {
        family: data.family_common_name,
        duration: data.duration,
        droughtTol: data.growth.drought_tolerance,
        shadeTol: data.growth.shade_tolerance,
        fertility: data.growth.fertility_requirement,
        minTemp: data.growth.temperature_minimum.deg_c,
        phMax: data.growth.ph_maximum,
        phMin: data.growth.ph_minimum,
        waterMax: data.growth.precipitation_maximum.cm,
        waterMin: data.growth.precipitation_minimum.cm
      };
      const plantInfo = {
        ...plantData,
        ...careInstructions,
        images: plantImages
      };
      index.addPlantToScanned(plantInfo, username);
      return utils.getStats(plantInfo);
    })
    .catch(err => console.log(err));
};

export const getScientificName = (searchText, username) => {
  console.log('getting the scientific_name by querying the common name');
  return axios
    .get(
      `https://trefle.io/api/plants?common_name=${searchText}&&token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      const scientificName = data[0].scientific_name;
      return getPlantByName(scientificName, username);
    })
    .catch(err => {
      console.log(err);
    });
};

export const getGardenCentres = (latitude, longitude) => {
  let axiosConfig = {
    headers: {
      Authorization:
        'Bearer qwLbB1PRQbFpaojg15pFJuAe37sWQn7p0v68E76MkEEdvhPY9pUhCovUnYpfWVKbGgtJaDhmLDMUuAx_HQtB7JWWmNHPrGBx7n0AB0osN5uyvrIlRqrYxBhTPvxzXnYx'
    }
  };
  return axios
    .get(
      `https://api.yelp.com/v3/businesses/search?term=GardenCentre&latitude=${latitude}&longitude=${longitude}`,
      axiosConfig
    )
    .then(({ data }) => {
      data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates
        };
      });
    })
    .catch(err => {
      console.log(err);
    });
};
