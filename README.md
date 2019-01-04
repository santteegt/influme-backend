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
mongod --dppath ./data_db
```
## Deploy server for development

```
$ cd src
$ npm run dev
```


