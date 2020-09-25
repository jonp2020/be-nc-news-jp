const request = require("supertest");
const app = require("../api/app.js");
const connection = require("../db/connection");

beforeEach = () => {
  return connection.seed.run();
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
        it("200: GET request responds with an array of topics objects", () => {
          return request(app)
            .get("/api/topics")
            .expect(200)
            .then((res) => {
              expect(res.body.topics).toEqual(expect.any(Array));
            });
        });
        it("404: incorrect path responds with status:404", () => {
          return request(app)
            .get("/api/tropics")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("path not found");
            });
        });
      });
      describe("POST topics", () => {
        it("201: POST responds with a 201 status", () => {
          return request(app)
            .post("/api/topics")
            .send({
              slug: "pengiuns",
              description: "They like to move it!",
            })
            .expect(201);
        });
        it("201: POST responds with newly posted topic", () => {
          return request(app)
            .post("/api/topics")
            .send({
              slug: "katsu curry",
              description: "Mmmmm... curry",
            })
            .then(({ body }) => {
              expect(body.topic).toEqual({
                slug: "katsu curry",
                description: "Mmmmm... curry",
              });
            });
        });
        it("400: POST responds with status 400 for post requests with incorrect keys", () => {
          return request(app)
            .post("/api/topics")
            .send({
              slugs: "testing for an incorrect key",
              desc: "testing for another incorrect key",
            })
            .expect(400);
        });
        it("400: POST responds with status 400 for post requests for duplicat items", () => {
          return request(app)
            .post("/api/topics")
            .send({ slug: "cats", description: "Not dogs" })
            .then(({ body: { msg } }) => {
              expect(msg).toBe(
                "The item you requested to post already exists."
              );
            });
        });
      });
    });
  });
  describe("GET /users", () => {
    it("200: GET users/ responds with the details of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          expect(res.body.users).toEqual(expect.any(Array));
          expect(res.body.users[0]).toHaveProperty("username");
        });
    });
  });
  describe("GET /users:username", () => {
    it("200: returns a GET request for a username with the correct user details", () => {
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
  describe.only("POST /users", () => {
    it("201: POST responds with a 201 status", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "JBees",
          avatar_url: "http://clipart-library.com/img1/775402.png",
          name: "Percy",
        })
        .expect(201);
    });
    it("201: POST responds with a new user", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "Dees",
          avatar_url: "http://clipart-library.com/data_images/39781.png",
          name: "Darcy",
        })
        .then(({ body }) => {
          expect(body.user).toEqual({
            username: "Dees",
            avatar_url: "http://clipart-library.com/data_images/39781.png",
            name: "Darcy",
          });
        });
    });
    it("400: POST responds with status 400 for post request with incorrect keys", () => {
      return request(app)
        .post("/api/users")
        .send({
          usrnamess: "Mr Test Post Names",
          avatarUrl: "www.abc.com",
          name: "Sarah",
        })
        .expect(400);
    });
  });

  describe("GET /articles", () => {
    it("200: returns a GET request with articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toEqual(expect.any(Array));
        });
    });
    it("404: responds with status 404 when receiving an invalid path GET request", () => {
      return request(app)
        .get("/api/aticles")
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).toBe("path not found");
        });
    });
    describe("GET /articles/:article_id", () => {
      it("200: returns a GET request for an article by its id", () => {
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
                created_at: "2010-11-17T12:21:54.171Z",
              },
            ]);
          });
      });
      it("404: returns an status of 404 for GET requests for article ids that do not currently exist", () => {
        return request(app)
          .get("/api/articles/1005")
          .expect(404)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "Sorry - either the article you asked for doesn't exist or has been moved.Please try another article (Psss - I've heard article 10 is a good one!)"
            );
          });
      });
      describe("GET /articles/:article_id/comments", () => {
        it("200: returns comments for a specified article id", () => {
          return request(app)
            .get("/api/articles/9/comments")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toEqual(expect.any(Array));
            });
        });
        it("404: returns a 404 status and message if an article has no comments", () => {
          return request(app)
            .get("/api/articles/2/comments")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(
                "There are no comments for this article yet. Be the first to add your comments!"
              );
            });
        });
      });
    });
  });
});
