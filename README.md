# Travelopia Monorepo

Welcome to the Travelopia monorepo! This repository contains both the UI and API code for the Travelopia project.

## Folder Structure

- **travelopia-ui**
  - **public**
  - **src**
    - **assets**
    - **components**
    - **interface**
    - **router**
    - **store**
    - **views**
    - **vuetify**
    - **App.vue**
    - **config.js**
    - **main.js**
  - **package.json**

- **travelopia-api**
  - **config**
    - **local.yaml**
    - **netlify.yaml**
  - **lib**
    - **cache-accessor**
    - **constants**
    - **data-accessor**
    - **database**
    - **routers**
    - **schema**
    - **service**
  - **scripts**
    - **Table Creation.txt**
  - **tests**
  - **app.js**
  - **package.json**

## Getting Started

### UI

1. Navigate to the `travelopia-ui` directory:
`cd travelopia-ui`
2. Install dependencies:
`npm install`
3. Run the development server:
`npm run dev`

This will start the development server for the UI, allowing you to work on the frontend of the Travelopia project.

### API

1. Navigate to the `travelopia-api` directory:
`cd travelopia-api`

2. Install dependencies:
`npm install`
3. Run the development server:
`npm run dev`

This will start the development server for the API, allowing you to work on the backend of the Travelopia project.

Please note that both the UI and API development servers should be running simultaneously to interact with the full Travelopia application.

## Notes

- The `travelopia-ui` folder contains the Vue.js frontend code, while the `travelopia-api` folder contains the Express.js backend code.
- The `config` folder in `travelopia-api` holds YAML configuration files for different environments.
- The `lib` folder in `travelopia-api` contains various backend modules like cache accessors, data accessors, routers, and more.
- The `scripts` folder in `travelopia-api` holds additional scripts related to the API.
- The `tests` folder in `travelopia-api` is intended for API testing.
