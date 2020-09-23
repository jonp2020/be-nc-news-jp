const {
  createTimeStamp,
  changeComments,
} = require("../db/utils/data-manipulation");

describe("createTimeStamp", () => {
  it("returns an array", () => {
    const timeStampCheck = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(typeof createTimeStamp(timeStampCheck)).toBe("object");
    expect(Array.isArray(createTimeStamp(timeStampCheck))).toBe(true);
  });
  it("returns a new object with an updated timestamp to a date format", () => {
    const timeStampCheck = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    expect(createTimeStamp(timeStampCheck)).toEqual([
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: new Date('2018-11-15T12:21:54.171Z'),
        votes: 100,
      },
    ]);
  });
  it("does not mutate the object in the array", () => {
    const timeStampCheck = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100,
      },
    ];
    const test = createTimeStamp(timeStampCheck);
    expect(test[0]).not.toBe(timeStampCheck[0]);
  });
});

describe("changeComments", () => {
  it("returns an array with an object", () => {
    const testArticle = [
      {
        article_id: 1,
        title: "They're not exactly dogs, are they?",
        body: "I find this existence challenging",
        votes: 100,
        topic: "mitch",
        author: "butter_bridge",
        created_at: "11/15/2018 12:21:54 PM",
      },
    ];

    const testComments = [
      {
        comment_id: 1,
        created_by: "butter_bridge",
        votes: 16,
        belongs_to: "They're not exactly dogs, are they?",
        created_at: "11/15/2018 12:21:54 PM",
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      },
    ];
    expect(typeof changeComments(testComments, testArticle)).toBe("object");
    expect(Array.isArray(changeComments(testComments, testArticle))).toBe(true);
  });
  it("updates the keys of the comments element", () => {
    const testArticle = [
      {
        article_id: 1,
        title: "They're not exactly dogs, are they?",
        body: "I find this existence challenging",
        votes: 100,
        topic: "mitch",
        author: "butter_bridge",
        created_at: "11/15/2018 12:21:54 PM",
      },
    ];

    const testComments = [
      {
        comment_id: 1,
        created_by: "butter_bridge",
        votes: 16,
        belongs_to: "They're not exactly dogs, are they?",
        created_at: "11/15/2018 12:21:54 PM",
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      },
    ];
    expect(changeComments(testComments, testArticle)).toEqual([
      {
        comment_id: 1,
        author: "butter_bridge",
        article_id: 1,
        votes: 16,
        created_at: "11/15/2018 12:21:54 PM",
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      },
    ]);
  });
  it ('updates keys pof multiple comments keys', ()=> {
    const testArticle = [
      {
        article_id: 1,
        title: "They're not exactly dogs, are they?",
        body: "I find this existence challenging",
        votes: 100,
        topic: "mitch",
        author: "butter_bridge",
        created_at: "11/15/2018 12:21:54 PM",
      },
      {
        article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        body: 'some gifs',
        votes: 0,
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: Date('2010-11-17T12:21:54.171Z')
      }

      
    ];
    const testComments = [
      {
        comment_id: 1,
        created_by: "butter_bridge",
        votes: 16,
        belongs_to: "They're not exactly dogs, are they?",
        created_at: "11/15/2018 12:21:54 PM",
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      },

      {
        comment_id: 2,
        created_by: "icellusedkars",
        votes: 0,
        belongs_to: "Eight pug gifs that remind me of mitch",
        created_at: "11/15/2018 12:21:54 PM",
        body:
          "some gifs!",
      }
    ]
    expect(changeComments(testComments, testArticle)).toEqual([
      {
        comment_id: 1,
        author: "butter_bridge",
        article_id: 1,
        votes: 16,
        created_at: "11/15/2018 12:21:54 PM",
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      },{
      comment_id: 2,
      author: "icellusedkars",
      article_id: 3,
      votes: 0,
      created_at: "11/15/2018 12:21:54 PM",
      body:
        "some gifs!"
    }])
  })
});

// - `comment_id` which is the primary key
// - `author` field that references a user's primary key (username)
// - `article_id` field that references an article's primary key
// - `votes` defaults to 0
// - `created_at` defaults to the current timestamp
// - `body`
