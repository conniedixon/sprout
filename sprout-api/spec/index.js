const axios = require("axios");

const getUser = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}`
  );
  return data;
};

const deleteuser = username => {
  axios.delete(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}`
  );
};

const addPlantToGarden = async (newPlant, username) => {
  await axios.patch(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/garden`,
    newPlant
  );
};

const getUserGarden = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/garden`
  );
  return data;
};

const getUserMedals = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/medals`
  );
  return data;
};

const getUserScannedPlants = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/scanned-plants`
  );
  return data;
};

const getUserWishlist = async username => {
  const { data } = await axios.get(
    `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/${username}/wishlist`
  );
  return data;
};
