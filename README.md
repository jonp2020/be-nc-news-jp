# Back-end Northcoder News API

## About

A back-end API for a user-generated news style website. Built using RESTful API principles, the API accepts requests to get articles by topic, article id, and by a specific user. Articles can be sorted by popularity and most commented. The API also accepts requests to post, patch and delete comments.

A hosted version on heroku can be found [here](https://nc-news-fe-jonp.herokuapp.com/).

To easily view the data in your browser, I would recommend installing a JSON viewer extension. I am currently using one called JSON Formatter. However, there are several available in the Chrome extension webstore that you can choose from.

The front-end for the project can be found in this repository here on [Github](https://github.com/jonp2020/fe-nc-news-jp.git).

## Getting Started

Follow the instructions below to get a local version up and running.

### Requirements

You'll need to have the following installed on your machine:

- Node Package Manager
- Node.js
- Express
- PostgreSQL
- Knex
- The Git CLI

### Installation

1. To begin with, (fork and) clone this repo.

```
$ git clone https://github.com/jonp2020/be-nc-news-jp.git
```

2. Navigate into the directory and install the required dependencies.

```
$ cd be-nc-news-jp
$ npm install
```

3. Get the app running on your machine.

Once you've installed the dependencies, you'll need to install and setup the database by running the following command:

```
$ npm run setup-dbs
```

Next, you'll need to seed the database with the data that our app will intially use when receiving requests. You can do this by running this command:

```
$ npm run seed
```

Now we're all good to go. You can start the server with the following command:

```
$ npm start
```

The server will be listening on localhost port 9090. You can see the project running in your browser here: **http://localhost:9090**.

Example endpoints on localhost:
**http://localhost:9090/api/topics** will return a list of topics of articles that are currently available.
**http://localhost:9090/api/articles** will return a list of all the articles currently available.

A full list of endpoints is available on the [hosted version on heroku](https://nc-news-fe-jonp.herokuapp.com/).

4. Enjoy!

## Built Using

- Express
- Node.js
- PostgreSQL
- Knex
