/** @format */

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
  waterMin
}) => {
  let difficultyRating = 0;
  let precipitation = 70;
  let ph = 6.5;
  let tempMin = 15;
  let trafficLight;

  let lightLevel;
  if (shadeTol === 'High') lightLevel = 'Low';
  else if (shadeTol === 'Low')
    (lightLevel = 'High'), (difficultyRating = difficultyRating + 2);
  else (lightLevel = 'Medium'), (difficultyRating = difficultyRating + 1);

  if (droughtTol === 'Medium') difficultyRating = difficultyRating + 1;
  if (droughtTol === 'Intolerant') difficultyRating = difficultyRating + 2;

  if (fertility === 'High') difficultyRating = difficultyRating + 2;
  if (fertility === 'Medium') difficultyRating = difficultyRating + 1;

  if (waterMax) {
    const precAverage = (waterMax + waterMin) / 2;
    precipitation = Number.isInteger(precAverage)
      ? precAverage
      : Number(precAverage.toFixed(1));
  }

  let wateringSchedule;
  if (precipitation < 25) wateringSchedule = 'low: once a month';
  else if (precipitation > 25 && precipitation < 60)
    wateringSchedule = 'medium-low: twice a month';
  else if (precipitation > 60 && precipitation < 95)
    wateringSchedule = 'medium: once a week';
  else if (precipitation > 95 && precipitation < 130)
    wateringSchedule = 'medium-high: once every five days';
  else if (precipitation > 130)
    wateringSchedule = 'high: once every one to three days';

  if (phMax) {
    const phAverage = (phMax + phMin) / 2;
    ph = Number.isInteger(phAverage) ? phAverage : Number(phAverage.toFixed(1));
  }

  if (minTemp) {
    tempMin = Number.isInteger(minTemp) ? minTemp : Number(minTemp.toFixed(1));
  }

  if (difficultyRating <= 2) trafficLight = 'green';
  else if (difficultyRating >= 5) trafficLight = 'red';
  else trafficLight = 'amber';

  if (!commonName) commonName = scientificName;
  if (!duration) duration = 'n/a';
  return {
    commonName: commonName,
    duration: duration,
    family: family,
    scientificName: scientificName,
    precipitation: precipitation,
    ph: ph,
    lightLevel: lightLevel,
    minTemp: tempMin,
    difficulty: trafficLight,
    wateringSchedule: wateringSchedule
  };
};
