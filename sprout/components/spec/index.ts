/** @format */
const axios = require("axios");

export const getUser = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}`
  );
  return data;
};

export const deleteuser = username => {
  axios.delete(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}`
  );
};

export const addPlantToGarden = async (newPlant, username) => {
  await axios.patch(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/garden`,
    newPlant
  );
};

export const getUserGarden = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/garden`
  );
  return data;
};

export const getUserMedals = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/medals`
  );
  return data;
};

export const getUserScannedPlants = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/scanned-plants`
  );
  return data;
};

export const getUserWishlist = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/wishlist`
  );
  return data;
};

export const addPlantToScanned = async (newPlant, username) => {
  await axios.patch(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/scanned-plants`,
    newPlant
  );
};

export const postImageToS3 = async (image, username, timestamp) => {
  const requestBody = { timestamp };
  await axios
    .put(
      `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/s3/${username}`,
      requestBody
    )
    .then(({ data }) => {
      axios.put(data, image);
    });
};

export const getImageFromS3 = async (username, timestamp) => {
  console.log(timestamp, username);
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/s3/${username}/${timestamp}`
  );
  return axios.get(data).then(({ data }) => {
    return data["Body"];
  });
};
