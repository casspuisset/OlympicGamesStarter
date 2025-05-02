# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Organisation

The architecture of this app is defined as :

- `pages` folder: contains components for each routes : Dashboard (the landing and main page), Details (reusable component for each country) and NotFound (for redirection in case of inexisting url or path);
- `core` folder: contains the business logic (`services` and `models` folders).

The datas are, for now, provided by `olympic.json` file in an `assets` folder and restituted as Observables.

## Library

This app use ngx-charts as a library. Please install it with `npm install @swimlane/ngx-charts --save`. Make sure to run this app with the lastest version of angular/cli to prevent any error of compatibily.

## Presentation

OlympicGamesStarter is an application that creates visual reprentation and graphics of datas about different countries during previous Olympic Games. The Dashboard contains global datas such as how many countries and games are represented and the relative quantity of medals for each country.

The app provides a page for each country as well, with the number of medals gained at each edition or the quantity of athletes from this country.

In case of error (such as the search of an unregistered country with the url), the router redirects the user to an error page where they can regain the dashboard.