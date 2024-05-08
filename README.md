# node-sample-api

This project is an API developed using Node.js, Express, MongoDB and Mongoose 
to establish the connection with the database persisten storage.
Also Provides a set of endpoints to interact with the MongoDB database.

## STEPS TO RUN THE PROJECT

REQUIREMENTS

Node.js installed on your machine.

MongoDB installed and running on your machine.

STEPS

1. Ensure that you are using the correct node version
```bash
nvm use
```

2. Install packages
```bash
npm install
```

4. Export the next required env var for MongoDB connection
```
export MONGO_URI=<mongo_uri>
```

e.g
```bash
export MONGO_URI=mongodb://localhost:27017/test_br_api
```

4. 
```bash
npm start-dev
```

**start WITH DOCKER**

When you're ready, start your application by running: 

```bash
docker compose up --build
```

# CI

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