const app = require("./app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

it("Gets the test endpoint", () => {
  // Sends GET Request to /test endpoint
  return request
    .get("/")
    .expect("Content-Type", /json/)
    .expect(200)
    .then((response) => {
      expect(response.body).any(String);
    });
});
