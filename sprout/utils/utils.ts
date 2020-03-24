/** @format */

import { getImageFromS3 } from "../components/spec/index";

export const getStats = ({
  commonName,
  scientificName,
  family,
  duration,
  droughtTol,
  shadeTol,
  fertility,
  minTemp,
  phMax,
  phMin,
  waterMax,
  waterMin,
  images,
  timestamp,
}) => {
  let difficultyRating = 0;
  let precipitation = 70;
  let ph = 6.5;
  let tempMin = 15;
  let trafficLight;

  let lightLevel;
  if (shadeTol === "High") lightLevel = "Low";
  else if (shadeTol === "Low")
    (lightLevel = "High"), (difficultyRating = difficultyRating + 2);
  else (lightLevel = "Medium"), (difficultyRating = difficultyRating + 1);

  if (droughtTol === "Medium") difficultyRating = difficultyRating + 1;
  if (droughtTol === "Intolerant") difficultyRating = difficultyRating + 2;

  if (fertility === "High") difficultyRating = difficultyRating + 2;
  if (fertility === "Medium") difficultyRating = difficultyRating + 1;

  if (waterMax) {
    const precAverage = (waterMax + waterMin) / 2;
    precipitation = Number.isInteger(precAverage)
      ? precAverage
      : Number(precAverage.toFixed(1));
  }

  let wateringSchedule, wateringInterval;
  if (precipitation < 25) {
    wateringSchedule = "Once a month";
    wateringInterval = 1;
  } else if (precipitation > 25 && precipitation < 60) {
    wateringSchedule = "Twice a month";
    wateringInterval = 2;
  } else if (precipitation > 60 && precipitation < 95) {
    wateringSchedule = "Once a week";
    wateringInterval = 4;
  } else if (precipitation > 95 && precipitation < 130) {
    wateringSchedule = "Once every five days";
    wateringInterval = 6;
  } else if (precipitation > 130) {
    wateringSchedule = "Once every one to three days";
    wateringInterval = 10;
  }

  if (phMax) {
    const phAverage = (phMax + phMin) / 2;
    ph = Number.isInteger(phAverage) ? phAverage : Number(phAverage.toFixed(1));
  }

  if (minTemp) {
    tempMin = Number.isInteger(minTemp) ? minTemp : Number(minTemp.toFixed(1));
  }

  if (difficultyRating <= 2) trafficLight = "green";
  else if (difficultyRating >= 5) trafficLight = "red";
  else trafficLight = "amber";

  if (!commonName) commonName = scientificName;
  if (!duration) duration = "n/a";

  if (!images.length || images === undefined) images = "No pictures available";
  return {
    images: images,
    commonName: commonName,
    duration: duration,
    family: family,
    scientificName: scientificName,
    precipitation: precipitation,
    ph: ph,
    lightLevel: lightLevel,
    minTemp: tempMin,
    difficulty: trafficLight,
    wateringSchedule: wateringSchedule,
    wateringInterval: wateringInterval,
    timestamp,
  };
};

export const getImageForPlant = (username, plant) => {
  return getImageFromS3(username, plant.timestamp).then(base64 => {
    const uri = `data:image/jpg;base64,${base64}`;
    return {
      ...plant,
      uri,
    };
  });
};

export const getImagesForPlants = (username, plants) => {
  return Promise.all(
    plants.map(plant => {
      return getImageForPlant(username, plant);
    })
  );
};
