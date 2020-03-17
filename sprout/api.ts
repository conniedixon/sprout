/** @format */

const axios = require("axios");

export const getPlantById = (base64: any) => {
  console.log("in the api");
  const plantImg = { images: [base64] };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      "Api-Key": "oEk029eOZyIto6lZoAWI4WKqVxPiV4Tt6Dl3JMIGDOXQ3V3Uu9"
    }
  };
  return axios
    .post("https://api.plant.id/v2/identify", plantImg, axiosConfig)
    .then(({ data: { suggestions } }) => {
      const scientificName = suggestions[0].plant_details.scientific_name;

      return getPlantByName(scientificName);
    })
    .catch(err => {
      console.log(err);
    });
};

function getPlantByName(scientificName) {
  console.log("in the second function");
  return axios
    .get(
      `https://trefle.io/api/plants?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09&&scientific_name=${scientificName}`
    )
    .then(({ data }) => {
      const trefleId = data[0].id;
      return getSingularPlant(trefleId);
    })
    .catch(err => {
      console.log(err);
    });
}

function getSingularPlant(plantId) {
  console.log("in the third function");
  return axios
    .get(
      `https://trefle.io/api/plants/${plantId}?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      const plantFamilyId = data.main_species.sources[0].species_id;
      const plantData = {
        common_name: data.main_species.common_name,
        scientific_name: data.scientific_name
      };
      return getCareInstructions(plantFamilyId, plantData);
    })
    .catch(err => {
      console.log(err);
    });
}

const getCareInstructions = (plantFamilyId, plantData) => {
  console.log("in the fourth function");
  return axios
    .get(
      `https://trefle.io/api/species/${plantFamilyId}?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09`
    )
    .then(({ data }) => {
      const careInstructions = {
        min_temp: data.growth.temperature_minimum.deg_c,
        shade_tolerance: data.growth.shade_tolerance,
        precipitation_min: data.growth.precipitation_minimum.cm,
        precipitation_max: data.growth.precipitation_maximum.cm,
        ph_minimum: data.growth.ph_minimum,
        ph_maximum: data.growth.ph_maximum,
        fertility_requirement: data.growth.fertility_requirement,
        drought_tolerance: data.growth.drought_tolerance,
        family: data.family_common_name,
        duration: data.duration
      };
      const plantInfo = { ...careInstructions, ...plantData };
      return plantInfo;
    })
    .catch(err => console.log(err));
};
