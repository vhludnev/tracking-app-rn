## Tracking mobile app

- React Native (v.0.68),
- Expo (sdk v.45),
- React Hooks
- Context API,
- Android and IOS friendly,
- GPS location, map, tracking path, altitude, average speed, distance 
- Backend: Mongo DB, Node js, Express
- Ngrok

<br />

## Installation

The app requires [Node.js](https://nodejs.org/) v16+ and expo cli to run smoothly.

Install the dependencies and devDependencies first. _Example:_

```sh
npm i
npm i -g expo-cli
expo init `App project name`

```
* In directories Frontend and Backend run "npm i" separately

<br />

## Running application (enter in separate terminals)

```sh
add .env file to frontend directory (type apiURL="YOUR NGROK ADDRESS" LAT="YOUR LATITUDE" LNG="YOUR LONGITUDE")
npm run dev (in backend directory)
expo start  (in frontend directory)
ngrok http 3000

```
