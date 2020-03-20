import { StorageHelper } from "@aws-amplify/core";
const storage = new StorageHelper().getStorage();
const awsConfiguration = {
  Auth: {
    region: "eu-west-2",
    userPoolId: "eu-west-2_CGyggnWow",
    userPoolWebClientId: "18dte9lff5moqd8bl3c94uuq5g",
    storage
  },
  Analytics: {
    disabled: true
  }
};
export default awsConfiguration;
