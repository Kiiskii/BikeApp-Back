const request = require("supertest");
const app = require("./index.js");

// describe("test for journeys api request", () => {
//   test("returns response status 200", async () => {
//     console.log("got here");
//     const response = await request(app).get("/api/journeys");
//     console.log("got here too");
//     expect(response.status).toBe(200);
//   });
// });

test("adds 1 + 2 to equal 3", () => {
  expect(1 + 2).toBe(3);
});

// const request = require("supertest");
// const app = require("./index.js");

// let server;
// beforeAll(async () => {
//   server = await new Promise((resolve) => {
//     const instance = app.listen(3000, () => {
//       console.log("Server started");
//       resolve(instance);
//     });
//   });

//   // Additional setup code or async operations can be performed here
// });

// afterAll((done) => {
//   server.close(() => {
//     console.log("Server closed");
//     // Additional cleanup code or async operations can be performed here
//     done();
//   });
// });

// describe("test for journeys api request", function () {
//   test("returns response status 200", async (done) => {
//     const response = await request(app).get("/api/journeys");
//     expect(response.status).toBe(200);
//     done();
//   });
// });

describe("GET /api/users", () => {
  test("should return an array of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
  });
});

// test("adds 1 + 2 to equal 3", () => {
//   expect(1 + 2).toBe(3);
// });
