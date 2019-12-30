# influme-backend

Backend server for the Influme app

## Architecture Overview

The backend and admin frontend are implemented using the MERN stack (MongoDB, ExpressJS, React, NodeJS). The source code is structured as follows:

* `src/client` react-app project for the Admin frontend

* `src/models` Contains the DDO for each entity defined in the MongoDb database schema

* `src/controllers` Implement the controller actions that can be performed by the backend REST service

* `src/routes` Implement routes exposed by the backend REST service

* `src/server.js` Initializes and deploy the ExpressJS web server

* `src/config/index.js` Contains different config parameers (e.g. MongoDB connection params, etc)

## System requirements

* Node v10+
* Mongodb
* [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) (for Production deployment)

## Setup instructions

* Download the source code:

```
git clone https://github.com/santteegt/influme-backend.git -b wreact
cd influme-backend
```

* To install the project dependencies:

```
$ npm install
$ cd src
$ npm install
$ cd src/client
$ npm install
```

### Setup for Development

* In case MongoDb isn't running the background,  start an instance of `mongod`

```
$ cd src
mkdir ./data_db
mongod --dbpath ./data_db
```

* To deploy the backend

```
cd influme-backend/
$ npm start
```

* Set the `proxy` to `http://localhost:3000` in the `src/client/package.json`

* To deploy the Admin frontend

```
$ cd src/client
$ npm start
```

### (Production) deployment in Heroku

You need to create an account in Heroku and create a new App For more info, take a look at the Heroku official [docs](https://devcenter.heroku.com/)

* Set the `proxy` to `http://localhost:48907` in the `src/client/package.json`

* For the first time, a heroku remote needs to be set
```
$ heroku git:remote -a [heroku-app-name]
$ git pull remote master
```

* To deploy commit/push any change to the heroku instance

```
$ heroku login
$ git add .
$ git commit -m "Heroku deploy"
$ git push heroku wreact:master
```
