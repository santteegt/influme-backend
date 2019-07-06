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
## Deploy Backend

```
$ cd src
$ npm start
```

## Deploy Client React

```
$ cd src/client
$ npm start
```


## Dev deployment

$ git checkout -b wreact
$ git add -A
$ git commit -m "Heroku deploy"
$ git push origin wreact

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
$ git commit -m "Heroku deploy"
$ git push heroku wreact:master
```
## Extras
```
npm install --save multer
npm install multer-gridfs-storage --save
npm install gridfs-stream --save
```

