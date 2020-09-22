// extract any functions you are using to manipulate your data, into this file

const data = require("../data");
const { articlesWithAdaptedTimeStamp } = (exports.createTimeStamp = (data) => {
  const unixToTime = data.map((article) => {
    const newArticle = { ...article };
    const timeInMili = newArticle.created_at;
    const newTime = new Date(timeInMili);
    const humanDateFormat = newTime.toLocaleDateString();
    // console.log("date", humanDateFormat);
    const humanTimeFormat = newTime.toLocaleTimeString();
    delete newArticle.created_at;
    newArticle.created_at = humanDateFormat + " " + humanTimeFormat;
    return newArticle;
  });
  // console.log(unixToTime);
  return unixToTime;
});

exports.changeComments = (comments, articles) => {
  const newComment = comments.map((comment) => {
    const { comment_id, created_by, ...other } = comment;
    const formattedComment = { comment_id, author: created_by, ...other };
    delete formattedComment.created_by;
    return formattedComment;
  });
  console.log(newComment);
  return newComment;
};

// {
// 	comment_id: 1,
// 	created_by: "butter_bridge",
// 	votes: 16,
// 	belongs_to: "They're not exactly dogs, are they?",
// 	created_at: "11/15/2018 12:21:54 PM",
// 	body:
// 		"Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
// },

// - `comment_id` which is the primary key
// - `author` field that references a user's primary key (username)
// - `article_id` field that references an article's primary key
// - `votes` defaults to 0
// - `created_at` defaults to the current timestamp
// - `body`
