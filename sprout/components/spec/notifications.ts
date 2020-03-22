import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import { Alert } from "react-native";

// const PUSH_ENDPOINT = "https://your-server.com/users/push-token";

export default async function addNotifications(plantInfo) {
  const { wateringSchedule, wateringInterval, commonName } = plantInfo;
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);

  if (status !== "granted") {
    Alert.alert("No notification permissions!");
    return;
  }

  const localNotification = {
    title: "Sprout",
    body: `Don't forget to water your ${commonName} today!`
  };

  const interval =
    wateringInterval === 1 || wateringInterval === 2 ? "month" : "week";

  const id = await Notifications.scheduleLocalNotificationAsync(
    localNotification,
    {
      time: new Date().getTime() + 10000,
      repeat: "week"
    }
  );

  Alert.alert("Reminder set!", " ", [
    {
      text: "Remove reminder",
      onPress: () => {
        removeReminder(id);
      }
    }
  ]);
  return id;
}

const removeReminder = async localNotificationId => {
  await Notifications.cancelScheduledNotificationAsync(localNotificationId);
  Alert.alert("Reminder removed");
};
