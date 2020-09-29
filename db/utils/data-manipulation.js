// extract any functions you are using to manipulate your data, into this file

const data = require("../data");
// const { articlesWithAdaptedTimeStamp } = (

exports.createTimeStamp = (data) => {
  const unixToTime = data.map((article) => {
    const newArticle = { ...article };
    const timeInMili = newArticle.created_at;
    const newTime = new Date(timeInMili);
    delete newArticle.created_at;
    newArticle.created_at = newTime;
    return newArticle;
  });
  return unixToTime;
};

exports.changeComments = (comments, articles) => {
  const newComment = comments.map((comment) => {
    const { comment_id, created_by, ...other } = comment;
    const formattedComment = { comment_id, author: created_by, ...other };
    delete formattedComment.created_by;
    return formattedComment;
  });
  const organisedComments = newComment.map((comment) => {
    const updatedComment = { ...comment };

    const article = articles.find((article) => {
      if (updatedComment.belongs_to === article.title) {
        return true;
      }
    });
    updatedComment.article_id = article.article_id;
    delete updatedComment.belongs_to;
    return updatedComment;
  });
  return organisedComments;
};
