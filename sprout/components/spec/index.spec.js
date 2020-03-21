const axios = require("axios");
const { expect } = require("chai");

describe("/users", () => {
  describe("POST", () => {
    it("Success: status 201", () => {
      return axios
        .post(
          "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users",
          { username: Date.now().toString() }
        )
        .then(({ status }) => {
          expect(status).to.equal(201);
        });
    });
    it("Empty request body: status 400", () => {
      return axios
        .post(
          "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users",
          {}
        )
        .then(({ status }) => {
          expect(status).to.equal(400);
        })
        .catch(err => {
          expect(err.response.status).to.equal(400);
        });
    });
    it("Username already exists, status 400", () => {
      return axios
        .post(
          "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users",
          { username: "connie" }
        )
        .then(({ status }) => {
          expect(status).to.equal(400);
        })
        .catch(err => {
          expect(err.response.status).to.equal(400);
        });
    });
  });
  describe("/{username}", () => {
    describe("GET", () => {
      it("Success: status 200 and returns a user object", () => {
        return axios
          .get(
            "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/robin"
          )
          .then(({ status, data }) => {
            expect(status).to.equal(200);
            expect(data).to.have.keys([
              "username",
              "garden",
              "scanned_plants",
              "medals"
            ]);
          });
      });
      it("Username does not exist: status 404", () => {
        return axios
          .get(
            "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/no"
          )
          .then(({ status, response }) => {
            expect(status).to.equal(404);
          })
          .catch(err => {
            expect(err.response.status).to.equal(404);
          });
      });
    });
    describe("DELETE", () => {
      it("Success: status 204", () => {
        return axios
          .delete(
            "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/1584529580524"
          )
          .then(({ status }) => {
            console.log();
            expect(status).to.equal(204);
          });
      });
      it("Username does not exist: status 404", () => {
        return axios
          .delete(
            "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/no"
          )
          .then(({ status, response }) => {
            expect(status).to.equal(404);
          })
          .catch(err => {
            expect(err.response.status).to.equal(404);
          });
      });
    });
    describe("/garden", () => {
      describe("GET", () => {
        it("Success: status 200 and returns a array", () => {
          return axios
            .get(
              "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/robin/garden"
            )
            .then(({ status, data }) => {
              expect(status).to.equal(200);
              expect(data).to.be.an("array");
            });
        });
        it("Username does not exist: status 404", () => {
          return axios
            .get(
              "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/no/garden"
            )
            .then(({ status, response }) => {
              expect(status).to.equal(404);
            })
            .catch(err => {
              expect(err.response.status).to.equal(404);
            });
        });
      });
      describe("PATCH", () => {
        it.only("Success - status 201", () => {
          const newPlant = {
            commonName: "bottle-palm",
            difficulty: "green",
            duration: "n/a",
            family: "Lily family",
            lightLevel: "Medium",
            minTemp: 15,
            ph: 6.5,
            precipitation: 70,
            scientificName: "Beaucarnea recurvata",
            wateringSchedule: "medium: once a week",
            plantImage: "robin/1584529580524.jpeg"
          };
          return axios
            .patch(
              "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/robin/garden",
              newPlant
            )
            .then(({ status, response }) => {
              expect(status).to.equal(201);
            });
        });
        it("Username does not exist: status 404", () => {
          const newPlant = {
            commonName: "bottle-palm",
            difficulty: "green",
            duration: "n/a",
            family: "Lily family",
            lightLevel: "Medium",
            minTemp: 15,
            ph: 6.5,
            precipitation: 70,
            scientificName: "Beaucarnea recurvata",
            wateringSchedule: "medium: once a week",
            plantImage: "robin/1584529580524.jpeg"
          };
          return axios
            .patch(
              "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/no/garden",
              newPlant
            )
            .then(({ status, response }) => {
              expect(status).to.equal(404);
            })
            .catch(err => {
              expect(err.response.status).to.equal(404);
            });
        });
      });
    });
    describe("/scanned-plants", () => {
      describe("GET", () => {
        it("Success: status 200 and returns a array", () => {
          return axios
            .get(
              "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/robin/scanned-plants"
            )
            .then(({ status, data }) => {
              expect(status).to.equal(200);
              expect(data).to.be.an("array");
            });
        });
        it("Username does not exist: status 404", () => {
          return axios
            .get(
              "https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/users/no/scanned-plants"
            )
            .then(({ status, response }) => {
              expect(status).to.equal(404);
            })
            .catch(err => {
              expect(err.response.status).to.equal(404);
            });
        });
      });
    });
  });
});

describe("/s3", (username, times) => {
  describe("/username", () => {
    describe("GET", () => {
      it("Success - status 200 & returns presigned s3 URL", () => {
        return axios
          .get(
            `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/s3/${username}`
          )
          .then(({ data }) => {
            expect(data).to.be.a("string");
          });
      });
    });
    describe("/timestamp", () => {
      it("Success - status 200 & returns presigned s3 URL", () => {
        return axios
          .get(
            `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/s3/${username}/${timestamp}`
          )
          .then(({ data }) => {
            expect(data).to.be.a("string");
          });
      });
      it("Success - get request to returned URL returns an image in base64", () => {
        return axios
          .get(
            `https://0ky9ja1k3b.execute-api.eu-west-2.amazonaws.com/Dev/s3/${username}/${timestamp}`
          )
          .then(({ data }) => {
            return axios.get(data).then(({ data }) => {
              expect(data["Body"]).to.be.a("string");
            });
          });
      });
    });
  });
});
