/** @format */
import * as utils from "./utils/utils";
import axios from "axios";
import * as index from "./components/spec/index";
import { config } from "./config";

export const getPlantById = (base64: any, username) => {
  console.log("in the api");

  const plantImg = { images: [base64] };
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",

      "Api-Key": config.PLANT_ID_API_KEY,
    },
  };
  const timestamp = Date.now();

  index.postImageToS3(base64, username, timestamp);

  return axios
    .post("https://api.plant.id/v2/identify", plantImg, axiosConfig)
    .then(({ data: { suggestions } }) => {
      const scientificName = suggestions[0].plant_details.scientific_name;

      return getPlantByName(scientificName, username, timestamp);
    })
    .catch(err => {
      console.log(err);
    });
};

function getPlantByName(scientificName, username, timestamp = null) {
  console.log("in the second function");

  return index.getPlantInfo(scientificName).then(data => {
    const plantInfo = {
      ...data,
      timestamp,
    };
    index.addPlantToScanned(plantInfo, username);
    return {
      ...plantInfo,
      timestamp,
    };
  });
  // return axios
  //   .get(
  //     `https://trefle.io/api/plants?token=${config.TREFLE_API_KEY}&&scientific_name=${scientificName}`
  //   )
  //   .then(({ data }) => {
  //     const trefleId = data[0].id;
  //     return getSingularPlant(trefleId, username, timestamp);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
}

function getSingularPlant(plantId, username, timestamp) {
  console.log("in the third function");

  return axios
    .get(
      `https://trefle.io/api/plants/${plantId}?token=${config.TREFLE_API_KEY}`
    )
    .then(({ data }) => {
      const plantFamilyId = data.main_species.sources[0].species_id;
      const plantData = {
        commonName: data.main_species.common_name,
        scientificName: data.scientific_name,
        timestamp: timestamp,
      };
      return getCareInstructions(plantFamilyId, plantData, username);
    })
    .catch(err => {
      console.log(err);
    });
}

const getCareInstructions = (plantFamilyId, plantData, username) => {
  console.log("in the fourth function");

  return axios
    .get(
      `https://trefle.io/api/species/${plantFamilyId}?token=${config.TREFLE_API_KEY}`
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
        waterMin: data.growth.precipitation_minimum.cm,
      };
      const plantInfo = {
        ...plantData,
        ...careInstructions,
        images: plantImages,
      };
      index.addPlantToScanned(plantInfo, username);
      return utils.getStats(plantInfo);
    })
    .catch(err => console.log(err));
};

export const getScientificName = (searchText, username) => {
  console.log("getting the scientific_name by querying the common name");
  return axios
    .get(
      `https://trefle.io/api/plants?common_name=${searchText}&&token=${config.TREFLE_API_KEY}`
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
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latitude},${longitude}&radius=1500&query=garden+centre&key=${config.GOOGLE_API_KEY}`
    )
    .then(({ data }) => {
      const result = data.results.map(centre => {
        return {
          name: centre.name,
          address: centre.formatted_address,
          opening_hours: centre.open_now,
          user_ratings: centre.user_ratings_total,
          coords: {
            latitude: centre.geometry.location.lat,
            longitude: centre.geometry.location.lng,
          },
        };
      });
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
