# influme-backend

## Setup instructions

### Run APP

* Source Code

```
https://github.com/santteegt/influme-backend.git
```

* Ubicarse en la rama **wreact**

* Install dependencies

```
$ npm install
$ cd src
$ npm install
$ cd src/client
$ npm install
```

#### Run localhost

* Start Local Mongod

In case mondod is not runnning as a daemon

```
$ cd src
mkdir ./data_db
mongod --dbpath ./data_db
```

* Prerequisitos

En el directorio **src/client** configurar la variable *proxy* con el siguiente valor `http://localhost:3000` que corresponde al backend local.

* Deploy Backend

```
cd influme-backend/
$ npm start
```

* Deploy Client React

```
$ cd src/client
$ npm start
```

#### Production deployment

* Prerequisitos

En el directorio **src/client** configurar la variable *proxy* con el siguiente valor `http://localhost:48907` que corresponde al backend en heroku.

* Only the first time, add the heroku remote
```
$ heroku git:remote -a influme
$ git pull remote master
```

* To deploy commit/push any change with any commit message

```
$ heroku login
$ git add .
$ git commit -m "Heroku deploy"
$ git push heroku wreact:master
```


## Dev deployment

$ git checkout -b wreact
$ git add .
$ git commit -m "Heroku deploy"
$ git push origin wreact

## Arquitectura Backend-Frontend

El backend implementado es compartido con una aplicacion react dentro del mismo servidor. El codigo fuente esta extructurado de la siguiente manera:

* `src/client` Contiene un proyecto React con las diferentes interfaces web.

* `src/models` Contiene los esquemas que representa las diferentes entidades de la base mongoDB.

* `src/controllers` Contiene los controladores con las diferentes acciones sobre la base mongoDB.

* `src/routes` Contiene las diferentes rutas para los controladores

* `src/server.js` Este archivo contiene la configuración de express para crear el servidor web con NodeJS.

* `src/config/index.js` Este archivo contiene la configuración de conexion con mongoDB.
