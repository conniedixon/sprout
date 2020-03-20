/** @format */
const superagent = require("superagent");
// const getPlantByName = require("./api");
const axios = require("axios");
jest.mock("axios");

describe.only("/api", () => {
  test("status: 200, responds with the plant id when passed a scientific name", async () => {
    const scientificName = "Helianthus annuus";
    // axios.get.mockResolvedValue({
    //   slug: "helianthus-annuus",
    //   scientific_name: "Helianthus annuus",
    //   link: "http://trefle.io/api/plants/141504",
    //   id: 141504,
    //   complete_data: true,
    //   common_name: "common sunflower"
    // });
    // const plantId = await getPlantByName(scientificName);
    // expect(plantId).toEqual(141504);

    await superagent
      .get(
        `https://trefle.io/api/plants?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09&&scientific_name=${scientificName}`
      )
      .then(({ body }) => {
        expect(body[0]).toEqual({
          slug: "helianthus-annuus",
          scientific_name: "Helianthus annuus",
          link: "http://trefle.io/api/plants/141504",
          id: 141504,
          complete_data: true,
          common_name: "common sunflower"
        });
        expect(body[0]).toHaveProperty("id");
      });
  });
  test("status: 404, when passed a scientific name that does not exist it responds with an empty array", async () => {
    const scientificName = "Helianthus an6773rnuus";
    await superagent
      .get(
        `https://trefle.io/api/plants?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09&&scientific_name=${scientificName}`
      )
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });
  //   test("status: 404, when requested with an invalid method", async () => {
  //     const scientificName = "Helianthus annuus";
  //     await superagent
  //       .patch(
  //         `https://trefle.io/api/plants?token=aXVMMTJIOTBXaHI2STlibXFOTGZndz09&&scientific_name=${scientificName}`
  //       )
  //       .send({})
  //       .then(({ body }) => {
  //         expect(body).toBe(undefined);
  //       });
  //   });
});
