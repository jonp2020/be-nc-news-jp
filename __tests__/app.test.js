const request = require("supertest");
const app = require("../api/app.js");
const connection = require("../db/connection");

beforeEach = () => {
  connection.seed.run();
};

afterAll = () => {
  return connection.destroy();
};

describe("app", () => {
  describe("/api", () => {
    describe("/topics", () => {
      describe("GET /topics", () => {
        it("GET request responds with Status:200", () => {
          return request(app).get("/api/topics").expect(200);
        });
        it("GET request responds with an array of topics objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
              expect(res.body.topics).toEqual(expect.any(Array));
            });
        });
        it("incorrect path responds with status:404", () => {
          return request(app)
            .get("/api/tropics")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("path not found");
            });
        });
      });
    });
    describe("GET /users", () => {
      it("GET users/ responds with the details of users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then((res) => {
            expect(res.body.users).toEqual(expect.any(Array));
            expect(res.body.users[0]).toHaveProperty("username");
          });
      });
    });
    describe("/users:username", () => {
      it("returns a GET request for a username with the correct user details", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then((res) => {
            expect(res.body.user).toEqual([
              {
                username: "butter_bridge",
                avatar_url:
                  "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
                name: "jonny",
              },
            ]);
          });
      });
      it("returns status 404 if the user does not exist", () => {
        return request(app)
          .get("/api/users/mad_hatter")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("No such user found for that username");
          });
      });
    });
    describe("GET /articles", () => {
      it("returns a GET request with articles", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then((res) => {
            expect(res.body.articles).toEqual(expect.any(Array));
          });
      });
      it("responds with status 404 when receiving an invalid path GET request", () => {
        return request(app)
          .get("/api/aticles")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe("path not found");
          });
      });
      describe.only("GET /articles:article_id", () => {
        it("returns a GET request for an article by its id", () => {
          return request(app)
            .get("/api/articles/3")
            .expect(200)
            .then((res) => {
              expect(res.body.article).toEqual([
                {
                  article_id: 3,
                  title: "Eight pug gifs that remind me of mitch",
                  body: "some gifs",
                  votes: 0,
                  topic: "mitch",
                  author: "icellusedkars",
                  created_at: "11/17/2010 12:21:54 PM",
                },
              ]);
            });
        });
      });
    });
  });
});
