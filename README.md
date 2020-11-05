# Interview Scheduler

Scheduler is a React single page application designed to assist users of a fictional web development bootcamp to book and update mock technical interviews with the school's mentors. This project was built for educational purposes, as part of the Lighthouse Labs curriculum.

The project utilizes React, Webpack, Babel, Express, Postgres, Axios, Storybook, Cypress and Jest. It uses the WebSocket API to make a persistent connection to the scheduler API server, allowing the app to function with multiple users connected.

## Final Product

 
!["Homepage"](https://github.com/jilliankmartin/scheduler/blob/master/docs/Homepage.jpeg?raw=true)


*  *  *
#### Adding a new appointment:

!["Adding a new appointment"](https://github.com/jilliankmartin/scheduler/blob/master/docs/Add-new-interview.jpeg?raw=true)


*  *  *
#### Adding a name and selecting an interviewer:

!["Adding a name and selecting an interviewer"](https://github.com/jilliankmartin/scheduler/blob/master/docs/Add-new-name.jpeg?raw=true)


*  *  *
#### Deleting an Apopintment:

![Deleting an appointment](https://github.com/jilliankmartin/scheduler/blob/master/docs/Delete.jpeg?raw=true)

## Setup

Install dependencies with `npm install`.

Visit http://localhost:8000 in the browser.

## Connecting to the API

Fork and clone the [scheduler-api](https://github.com/lighthouse-labs/scheduler-api) into a new directory and follow the database setup instructions. You must add http://localhost:8001 as a proxy in your package.json.

Run the API server in a new terminal with `npm start`. View the API at http://localhost:8001/api/*

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Running Tests with Cypress

```sh
npm install -g cypress
```
Create and configure the cypress.json file with base URL http://localhost:8000

Duplicate the .env.development file and rename it to .env.test. Change only the PGDATABASE value to scheduler_test (or other relevant DB)

Create a new database called scheduler_test

Start the Scheduler API Server in test mode

```sh
npm run test:server
```
Make a GET request to http://localhost:8001/api/debug/reset to reset the database

Ensure the webpack dev server is running

Start Cypress

```sh
npm run cypress
```