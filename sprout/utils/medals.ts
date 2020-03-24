import { Alert } from "react-native";
import { medalsRef } from "./medals-ref";
import { addMedal } from "../components/spec";

export const awardMedal = (plantCount, username, goToMedals) => {
  const medal = calculateMedal(plantCount);
  if (medal) {
    const { award, description, slug } = medal;
    addMedal(slug, username).then(() => {
      Alert.alert(
        "Medal achieved!",
        `You've just been awarded the ${award} medal for ${description}`,
        [
          {
            text: "See All Medals",
            onPress: goToMedals,
          },
          {
            text: "Continue",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
        ]
      );
    });
  }
};

const calculateMedal = plantCount => {
  if (plantCount === 1) return medalsRef.scannedOnePlant;
  else if (plantCount === 10) return medalsRef.scannedTenPlants;
  else if (plantCount === 50) return medalsRef.scannedFiftyPlants;
};
