/** @format */

const axios = require('axios');

export const getPlantById = (photo: any) => {
  console.log('in the api');
  const plantImg = { images: [photo.base64] };
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Api-Key': 'oEk029eOZyIto6lZoAWI4WKqVxPiV4Tt6Dl3JMIGDOXQ3V3Uu9'
    }
  };
  axios
    .post('https://api.plant.id/v2/identify', plantImg, axiosConfig)
    .then(({ data: { suggestions } }) => {
      const scientificName = suggestions[0].plant_details.scientific_name;
      console.log(scientificName);
      getPlantByName(scientificName);
    })
    .catch(err => {
      console.log(err);
    });
};

const getPlantByName = scientificName => {
  console.log('in the second function');
  axios
    .get(
      `https://trefle.io/api/plants?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09&&scientific_name=${scientificName}`
    )
    .then(({ data }) => {
      const trefleId = data[0].id;
      getSingularPlant(trefleId);
    })
    .catch(err => {
      console.log(err);
    });
};

const getSingularPlant = plantId => {
  console.log('in the third function');
  axios
    .get(
      `https://trefle.io/api/plants/${plantId}?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      const plantFamilyId = data.forms[0].main_species_id;
      getPlantFamily(plantFamilyId);

      const plantData = {
        common_name: data.main_species.common_name,
        scientific_name: data.scientific_name
      };

      console.log(plantData);
    })
    .catch(err => {
      console.log(err);
    });
};

const getPlantFamily = plantFamilyId => {
  axios
    .get(
      `https://trefle.io/api/species/${plantFamilyId}?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      console.log(data, '<-- species');
    })
    .catch(err => console.log(err));
};
