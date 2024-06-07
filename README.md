# node-sample-api

## Overview

This project is an API developed using Node.js, Express, MongoDB and Mongoose to establish the connection with the database persisten storage.
Also Provides a set of endpoints to interact with the MongoDB database.

## Logs and Metrics

`logger/logger.js`

The project includes a log formatter (Winston) for Loki or ELK logs scraping with preconfigured labels, it will send the logs to the stout.

`metrics/metrics.js`

It also includes a metrics server exposed in port 9100 http://localhost:9100 for metrics scraping with Prometheus

Registering metrics like API and DB response times and default node process metrics, by integrating these metrics with Prometheus and Grafana We can create visualization dashboards and improve the observability of the project.

## Project structure

```
.
├── database-config
│   ├── dbConfig.js
│   └── model.js
├── helm
│   ├── Chart.yaml
│   ├── charts
│   ├── dev.yaml
│   └── templates
│       ├── NOTES.txt
│       ├── _helpers.tpl
│       ├── deployment.yaml
│       ├── hpa.yaml
│       ├── ingress.yaml
│       ├── service.yaml
│       ├── serviceaccount.yaml
│       └── tests
├── logger
│   └── logger.js
├── metrics
│   └── metrics.js
├── routes
│   └── routerUser.js
└── scripts
    └── ci-deploy-script.sh
├── app.js
├── compose.yaml
├── Dockerfile
├── eslint.config.mjs
├── package-lock.json
├── package.json
├── README.md
```


## STEPS TO RUN THE PROJECT

**Prerequisites**

- Node.js (nvm)
- MongoDB database

STEPS

1. Ensure that you are using the correct node version
```bash
nvm use 20.12.1
```

2. Install packages
```bash
npm install
```

3. Export the next required env var for MongoDB connection
```bash
export MONGO_URI=<mongo_uri>
```

e.g
```bash
export MONGO_URI=mongodb://localhost:27017/test_br_api
```

4. Start the server (dev mode)
```bash
npm run start-dev
```

**start WITH DOCKER**

> Validate your docker network for mongo connection

```bash
docker compose up --build
```

# CI config components

### Lint config
https://eslint.org/docs/latest/use/getting-started

ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

```
npm run lint
```

### Prettier

https://prettier.io/docs/en/

Prettier is a code formatter

```
npm run prettier
```