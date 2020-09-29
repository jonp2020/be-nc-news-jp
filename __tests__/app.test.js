const request = require("supertest");
const app = require("../api/app.js");
const { get } = require("../api/Router/api.router.js");
const connection = require("../db/connection");

describe("app", () => {
  beforeEach(() => {
    return connection.seed.run();
  });

  afterAll(() => {
    return connection.destroy();
  });

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
        it("400: POST responds with status 400 for post requests for duplicate items", () => {
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
  describe("POST /users", () => {
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
    it("400: POST responds with status 400 for post requests for duplicate usernames", () => {
      return request(app)
        .post("/api/users")
        .send({
          username: "butter_bridge",
          avatar_url:
            "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          name: "jonny",
        })
        .then(({ body: { msg } }) => {
          expect(msg).toBe("The item you requested to post already exists.");
        });
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
    it("200: accepts sort_by queries defaulted to created_at", () => {
      return request(app)
        .get("/api/articles?sort_by=created_at")
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    it("200: accepts order queries", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toBeSortedBy("created_at");
        });
    });
    it("200: filters the results of articles by author", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0].author).toBe("butter_bridge");
        });
    });
    it("200: filters the results of articles by topic", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(({ body: { articles } }) => {
          expect(articles[0].topic).toBe("cats");
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
                comment_count: "0",
              },
            ]);
          });
      });
      it("400: returns status 400 for GET request with invalid article id", () => {
        return request(app)
          .get("/api/articles/dog")
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).toBe(
              "Invalid article id. Please try again using a valid article id number."
            );
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
        it("200: returns comments in order of created_at by default", () => {
          return request(app)
            .get("/api/articles/9/comments")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeSortedBy("created_at", {
                descending: true,
              });
            });
        });
        it("200: returns comments sorted by column specified by user", () => {
          return request(app)
            .get("/api/articles/9/comments?sort_by=votes")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeSortedBy("votes", {
                descending: true,
              });
            });
        });
        it("200: returns comments in ascending order", () => {
          return request(app)
            .get("/api/articles/9/comments?order=asc")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeSortedBy("created_at");
            });
        });
        it("200: returns comments sorted by order and column specified by user", () => {
          return request(app)
            .get("/api/articles/9/comments?sort_by=votes&order=asc")
            .expect(200)
            .then((res) => {
              expect(res.body.comments).toBeSortedBy("votes");
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
        describe("POST /articles/:article_id/comments", () => {
          it("201: POST request returns status 201", () => {
            return request(app)
              .post("/api/articles/9/comments")
              .send({
                author: "butter_bridge",
                article_id: 9,
                votes: 2,
                created_at: "2020-09-15 10:23:53.1",
                body: "That sounds great!",
              })
              .expect(201);
          });
          it("201: POST request responds with a new comment", () => {
            return request(app)
              .post("/api/articles/9/comments")
              .send({
                author: "butter_bridge",
                article_id: 9,
                votes: 3,
                created_at: "2020-09-16 10:23:53.1",
                body: "Thanks",
              })
              .then(({ body }) => {
                expect(Object.keys(body.comment)).toEqual(
                  expect.arrayContaining([
                    "comment_id",
                    "author",
                    "created_at",
                    "votes",
                    "body",
                  ])
                );
              });
          });
        });
      });
      describe("POST /articles", () => {
        it("201: POST responds with a 201 status", () => {
          return request(app)
            .post("/api/articles")
            .send({
              // article_id:
              title: "Video of cat singing",
              body: "Here's a great vid of a cat belting out some tunes",
              votes: 0,
              topic: "cats",
              author: "rogersop",
              created_at: "2002-11-19 12:21:54.1",
            })
            .expect(201);
        });
        it("201: POST responds with a new article", () => {
          const testArticleToPost = {
            title: "Video of cats dancing",
            body: "Here's a great vid of a cat belting out some tunes",
            votes: 0,
            topic: "cats",
            author: "rogersop",
            created_at: "2003-11-15 10:23:53.1",
          };
          return request(app)
            .post("/api/articles")
            .send(testArticleToPost)
            .then(({ body }) => {
              expect(body.article).toEqual({
                article_id: 13,
                author: "rogersop",
                body: "Here's a great vid of a cat belting out some tunes",
                created_at: "2003-11-15T10:23:53.100Z",
                title: "Video of cats dancing",
                topic: "cats",
                votes: 0,
              });
            });
        });
        it("400: POST responds with status 400 for post request with incorrect keys", () => {
          return request(app)
            .post("/api/articles")
            .send({
              tite: "Video of cats eating",
              bodie:
                "Here's a great vid of a cat tucking into a Sainbury's chocolate fish pudding",
              vottes: 0,
              topix: "cats",
              auther: "rogersop",
              craeted_at: "2003-11-14 11:23:53.1",
            })
            .expect(400);
        });
        it("400: POST responds with status 400 for requests to post duplicate entries", () => {
          return request(app)
            .post("/api/articles")
            .send({
              article_id: 3,
              title: "Eight pug gifs that remind me of mitch",
              body: "some gifs",
              votes: 0,
              topic: "mitch",
              author: "icellusedkars",
              created_at: "2010-11-17T12:21:54.171Z",
            })
            .then(({ body: { msg } }) => {
              expect(msg).toBe(
                "The item you requested to post already exists."
              );
            });
        });
      });
      describe("201: PATCH /articles/:article_id", () => {
        it("201: responds with 201 status for patch request", () => {
          return request(app)
            .patch("/api/articles/3")
            .send({ inc_votes: 1 })
            .expect(201);
        });
        it("201: responds with an updated article object", () => {
          return request(app)
            .patch("/api/articles/5")
            .send({ inc_votes: 7 })
            .expect(201)
            .then(({ body }) => {
              expect(body.article).toEqual({
                article_id: 5,
                title: "UNCOVERED: catspiracy to bring down democracy",
                body: "Bastet walks amongst us, and the cats are taking arms!",
                votes: 7,
                topic: "cats",
                author: "rogersop",
                created_at: "2002-11-19T12:21:54.171Z",
              });
            });
        });
        it("404: returns 404 status following PATCH request with invalid key", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votez: 7 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(
                "Could not update. Please check the spelling of the key fields."
              );
            });
        });
      });
      describe("DELETE /api/articles/:article_id", () => {
        it("204: returns status 204 for successful DELETE of an article by its id", () => {
          return request(app).delete("/api/articles/1").expect(204);
        });
        it("404: DELETE request for non-existent article id responds with 404", () => {
          return request(app)
            .delete("/api/articles/100")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Article not found.");
            });
        });
      });

      describe("PATCH /api/comments/:comment_id", () => {
        it("201: PATCH responds with 201 status when updating comment votes", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 1 })
            .expect(201);
        });

        it("201: PATCH status 201 responds with updated comment", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ inc_votes: 6 })
            .expect(201)
            .then(({ body }) => {
              expect(body.comment).toEqual({
                comment_id: 1,
                author: "butter_bridge",
                article_id: 9,
                votes: 22,
                created_at: "2017-11-22T12:36:03.389Z",
                body:
                  "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
              });
            });
        });
        it("404: PATCH responds with 404 status when given invalid key", () => {
          return request(app)
            .patch("/api/comments/1")
            .send({ include_votes: 1 })
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe(
                "Could not update. Please check the spelling of the key fields."
              );
            });
        });
      });
      describe("DELETE /api/comments/:comment_id", () => {
        it("204: returns status 204 for successful DELETE of a comment by its id", () => {
          return request(app).delete("/api/comments/1").expect(204);
        });
        it("404: DELETE request for non-existent comment id number returns 404 status", () => {
          return request(app)
            .delete("/api/comments/101")
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).toBe("Comment not found.");
            });
        });
      });
    });
  });
});
