# Sprout

## A full demonstration of this app in use can be found at https://www.youtube.com/watch?v=29kMLJ76U1g

Welcome to Sprout, an app built that allows you to identify, catalogue, and purchase plants. Simply scan a plant to find out what it is and information about how to care for it, then either add it to your Garden or Wishlist to keep a track of your plants. You can set reminders to water, and nearby shops to purchase items in your wishlist, and earn medals for using Sprout!

## Features 
 - Identify plants by taking pictures, uploading them from your camera roll, or searching by common name
 - Recieve information on the plant, including scientific name, family, and how to care for it. 
 - Add plants to "My Garden" to keep track of the plants you own
 - Set push notification reminders to water your plants 
 - Add plants to "My Wishlist"
 - See nearby stores to purchase plants, linked via Google Maps to take you to a store of your choice
 - See all the plants you've scanned
 - Earn a range of medals for scanning plants and adding them to your garden

## Tech Stack 
This app uses JavaScript, TypeScript, React-Native, Expo, AWS, S3 Buckets, Amplify, Cognito, DynamoDB and Adobe Suite. 

## Set up : APIs and AWS
To run this app, you will need to be registered and obtain a key from AWS (https://aws.amazon.com/), google maps (https://developers.google.com/maps/), plant.id (www.https://plant.id/) and Trefle (https://trefle.io/). 

To set up AWS: 
1. cd into sprout
2. create a folder named `aws-config.js`
3. Paste the following, with your own AWS Auth information.
import { StorageHelper } from "@aws-amplify/core";

`const storage = new StorageHelper().getStorage();
const awsConfiguration = {
  Auth: {
    <your authorization information here>
  },
  Analytics: {
    disabled: true,
  },
};
export default awsConfiguration;`

To set up APIs: 
1. cd in to sprout
2. create a folder named `config.ts`
3. Paste the following with your own API keys: 

`export const config = {
  GOOGLE_API_KEY: <key here>
  TREFLE_API_KEY: <key here>
  PLANT_ID_API_KEY: <key here>
};`

## Set up: Expo

1. cd into sprout 
2. run `npm i` in terminal 
3. run `expo start` and use your phone and the expo app to use Sprout

