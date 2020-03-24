import { Alert } from "react-native";
import { medalsRef } from "./medals-ref";

export const awardMedal = (plantCount, goToMedals) => {
  const medal = calculateMedal(plantCount);
  if (medal) {
    const { award, description } = medal;
    Alert.alert(
      "Medal achieved!",
      `You've just been awarded the ${award} medal for ${description}`,
      [
        {
          text: "Go to Medals Page",
          onPress: goToMedals,
        },
        {
          text: "Continue",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
  }
};

const calculateMedal = plantCount => {
  if (plantCount === 1) return medalsRef.scannedOnePlant;
  else if (plantCount === 10) return medalsRef.scannedTenPlants;
  else if (plantCount === 50) return medalsRef.scannedFiftyPlants;
};
