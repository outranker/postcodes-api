<h1 align="center" style="display: block; font-size: 2.5em; font-weight: bold; margin-block-start: 1em; margin-block-end: 1em;">
<a name="logo" href="https://postcodes-api.javohirmirzo.com/readme-header.png"><img align="center" src="https://postcodes-api.javohirmirzo.com/readme-header.png" alt="Postcodes API endpoint" style="width:100%;height:100%"/></a>
  <br><br><strong>Postcodes API</strong>
</h1>

![Latest release](https://img.shields.io/github/v/release/aregtech/areg-sdk?label=%20%F0%9F%93%A3%20Latest%20release&style=flat&logoColor=b0c0c0&labelColor=363D44)

---

<!-- markdownlint-disable -->

## Introduction[![](./docs/img/pin.svg)](#introduction)

**Postcodes API** is a developer-friendly, easy-to use backend to help clients get crucial info they need when working with postcodes. The REST api is built with [Express](https://expressjs.com/) and supports [TypeScript](https://www.typescriptlang.org/) out-of-the-box

## Table of contents[![](./docs/img/pin.svg)](#table-of-contents)

1. [Intial setup](#initial-setup)
2. [Project structure](#project-structure)
3. [Documentation](#documentation)
4. [Docker and Docker Compose](#docker)

---

## Initial setup[![](./docs/img/pin.svg)](#initial-setup)

To start app locally first clone the repository:

```
git clone https://github.com/outranker/postcodes-api.git
```

Then cd into directory and install dependencies

```
yarn or npm install
```

To start node process run

```
yarn dev or npm run dev
```

This will intiaite TypeScript in watch mode as well as nodemon for your js files in `dist` folder

> 💡 For node process to run properly, NODE_ENV must be set to one of `development`, `production` or `test`

---

## Project structure[![](./docs/img/pin.svg)](#project-structure)

Since this is a Typescript project, all code is in `src` directory and compiled js files are in `dist` directory.

```
.
├── public
└── src
    ├── config
    │   └── env
    ├── connection
    ├── controllers
    │   └── stores
    ├── docs
    │   └── routedocs
    │       └── stores
    ├── middlewares
    ├── models
    ├── routes
    │   └── v1
    │       └── stores
    ├── services
    │   └── stores
    ├── types
    │   └── express
    ├── utils
    └── validations
        └── stores
```

The project uses famous <b>MVC</b> pattern. Routes dir define all existing endpoints and Controllers dir handles business logic. Services deals with fetching data from data store.

---

## Documentation[![](./docs/img/pin.svg)](#documentation)

The api serves Swagger UI as a documentation for the endpoints. Just run the project locally and head over to [docs](https://postcodes-api.javohirmirzo.com/v1/docs/) route.

> 💡 All existing routes in the project is in `v1` path. Be sure to include it in url path to head over to existing route.

Ex:

```
curl --location --request GET 'http://0.0.0.0:3005/v1/stores/list
```

or

```
curl --location --request GET 'http://0.0.0.0:3005/v1/docs
```

---

## Docker and Docker Compose[![](./docs/img/pin.svg)](#docker)

### Docker

For ease of use, Dockerfile is provided. Since developers use different OS for development there might arise problems with platform compatibility.
Feel free to modify and build your own image using the Dockerfile

### Docker Compose

In order to quickly get going with the api without any extra hassle, use docker compose to quickly run the app locally in no time
