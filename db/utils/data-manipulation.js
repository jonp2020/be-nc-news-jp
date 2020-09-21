// extract any functions you are using to manipulate your data, into this file

const data = require("../data");


exports.createTimeStamp = (data) => {
   
   const unixToTime = data.map(article =>{
    const timeInMili = article.created_at;
    const newTime = new Date(timeInMili)
    const humanDateFormat = newTime.toLocaleDateString()
    const humanTimeFormat = newTime.toLocaleTimeString()
    //console.log(humanDateFormat, humanTimeFormat)
    delete article.created_at;
    article.created_at = humanDateFormat + " " + humanTimeFormat;
    return article
   })

   return unixToTime
    
}

/*
  {
    title: 'Moustache',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'Have you seen the size of that thing?',
    created_at: 154700514171
  }

*/

