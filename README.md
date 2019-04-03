# influme-backend

## Setup Development Environment

* Intall nodemon

```
npm install -g nodemon
```

* Install dependencies

```
$ npm install
$ cd src
$ npm install

```



In case it is not set

```
source ~/.bashrc
```

### Start Local Mongod

In case mondod is not runnning as a daemon

```
mkdir ./data_db
mongod --dbpath ./data_db

```
## Deploy server for development

```
$ cd src
$ npm run dev
```

## Production deployment

Only the first time, add the heroku remote
```
$ heroku git:remote -a influme
$ git pull remote master
```

To deploy commit/push any change with any commit message

```
$ heroku login
$ git add -A
$ heroku commit -m "Heroku deploy"
$ heroku push heroku master
```


