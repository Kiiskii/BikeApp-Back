# BikeApp

This is my project for Solita's Dev Academy 2023. You can find the repository for the assignment here: https://github.com/solita/dev-academy-2023-exercise.

With this webapp you can find a list of Helsinki City Bike stations located in Helsinki and Espoo. You can also search for a specific station and check out more details about it including how many journeys where started and ended at said station in the summer of 2021. There is also a list of all the journeys completed during that time. In said list you will find the dates when each journey started and ended, what was the journeys start and end stations, distance covered and time used for the trip.

I used the Git Flows model for version control in this project.

## Index

- [Tech stack](#tech-stack)
- [Run a development build](#run-a-development-build)
- [Frontend](#front-end)
  - [Home Page](#home-page)
  - [Journeys List](#journeys-list)
  - [Stations List](#stations-list)
  - [Stations Details](#stations-details)
  - [Pagination](#pagination)
  - [Searching](#searching)
- [Backend](#backend)
  - [Database and handling data](#database-and-handling-data)
- [Testing](#testing)
- [To Do List](#to-do-list)
- [Reflection](#reflection)
- [Licenses](#licenses)

## Tech stack

- Angular
- Docker
- Node Express
- PostgreSQL
- Tailwind

## Run a development build

This project is run online. The frontend is hosted in [Github Pages](https://kiiskii.github.io/BikeApp-Front/home) and the backend and database are deployed on [Railway](https://railway.app/).

If you wish to run this app locally here are the requirments.

- Angular 15.2.0
- Node 20.0.0
- Docker

Running frontend locally:

1. Run 'git clone https://github.com/Kiiskii/BikeApp-Front.git' in your terminal.
2. Navigate to /bikeapp-front in your terminal and run `npm install`.
3. Run `ng serve --open` to deploy and open the application locally.

This will allow to run the frontend locally in your browser.

1. Run 'git clone https://github.com/Kiiskii/BikeApp-Back.git' i your terminal.
2. Navigate to /bikeapp-back in your terminal and run `docker-compose up --build`.
3. Open http://localhost:3000/api/journeys or http://localhost:3000/api/stations on your browser.

## Front End

The code for the front end can be found at [BikeApp-Front](https://github.com/Kiiskii/BikeApp-Front). The front includes two static components, a header used as a navbar to access different component of the app and a footer which tells where my data comes from and a link to my Github page.

### Home Page

The home page has a general explanation of the app and some general information about yours truly.

### Journeys List

The Journeys page has the information of all journeys traveled during the summer of 2021. The data has been paginated in the backend and there are buttons to move to the next page, previous page, last page and first page.

### Stations List

The Stations page has a complete list of all bike stations located in Helsinki and Espoo. The data has been paginated in the same way as the Journeys list.

This list also includes a search function, if the user wishes to search for a specific station.

All stations also have been routed to a details page if the user wishes to see more information about each station.

### Station Details

Once the user has headed to the details of a specific station they will be presented with the following information:

- Name of the station in finnish and swedish
- Address of station in finnish and swedish
- Bike capacity of the station
- Amount of departures from, and return to the station.

### Pagination

The pagination was mostly executed in the backend of the app. It restricts the amount of data sent per page and only loads more data when opening new pages or when searching for a station.

### Searching

When the user starts typing a search, the app will load in results that are similiar to the search query. This means they don't need to click a button to execute a search, but rather it happens dynamically.

Like the pagination, searching is mostly functional in the backend of the app.

## Backend

The backend of the app can be found at [BikeApp-Back](https://github.com/Kiiskii/BikeApp-Back) and was done using Javascript. It's code and database are in a docker container, making running it a bit easier.

### Database and handling data

The CSV files used in the project were imported first to a local PostgreSQL database and after cleaning up all journeys that had a distance of under 10 and duration of under 10, they were imported into the database in my Docker container. I also pruned all data that had "NULL" values in them.

SQL commands used to achieve these results:<br>
Remove journeys that lasted less than 10 seconds or distance was less than 10 meters.

```SQL
DELETE FROM journeys WHERE duration < 10;
DELETE FROM journeys WHERE covered_distance < 10;
DELETE FROM journeys WHERE
id IS NULL
departure IS NULL
return IS NULL...
```

All other SQL commands are run directly in the backend.
The schemas used for each table can be found in the front end files: <br>
[Journeys](https://github.com/Kiiskii/BikeApp-Front/blob/main/src/app/journey.model.ts)<br>
[Stations](https://github.com/Kiiskii/BikeApp-Front/blob/main/src/app/station.model.ts)

## Testing

Considering this was my first time doing proper testing, I think I did fairly well. <br>
I used Git Workflows to run 'ng test' every time I created a pull request on Github.<br>
I used Cypress to run E2E tests for my app.<br>
In the [API service test file](https://github.com/Kiiskii/BikeApp-Front/blob/main/src/app/api.service.spec.ts) I had unit test for all API service functions.<br>
I also had a test for converting seconds to minutes in the [Journeys test file](https://github.com/Kiiskii/BikeApp-Front/blob/main/src/app/journeys/journeys.component.spec.ts).

I attempted to create tests to check the database connection in my backend, but unfortunately couldn't figure out how to make it work with my database being in a Docker container.

## To Do List

Here is a list of features and changes I am planning to make in the near future (list will be updated as I complete these).

- A map to show the location of the selected station
- Better design for my app
- Different kinds of ordering for data.
- Ability to search for journeys within user specified range (e.g. journeys that lasted from 5 minutes to 10 minutes).
- More testing.

## Reflections

This project had a lot of "firsts" for me. Here is a small list of these:

- Making a fullstack app of my own with a backend that recieves data from a database.
- Using docker.
- Making tests for API calls in the frontend
- Making E2E tests.
- Deploying the backend and database of an app.

Doing all of this while being quite limited with time was very challenging, but also very rewarding. Even if I did not succeed in everything, I learned a lot and managed to figure out a lot of the issues I ran into. <br>
Overall I am pleased with the project, although I am slightly frustrated that there were some things I could not figure out, but I will take this in as a big learning opportunity. I would say that before this prject, frontend was much stronger for me, but this project gave me a lot of confidence in my backend skills too. <br>
A lot of credit goes to my friends who helped me out in sticky situations and gave me a lot of ideas and help with the project. You can find there Githubs here <br>
[Niko Söder](https://github.com/NikoSoder)
[Mico Rintala](https://github.com/Miconen)

Thank you for checking out my project!

#### Licenses

Station Data is owned by HSL<br>
Journeys Data is owned by City Bike Finland
