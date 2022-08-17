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

## _Previews_

| Sign in screen | Track List screen | Create track screen |
| ------ | ------ | ------ |
| <img src="https://github.com/vhludnev/tracking-app-rn/blob/main/frontend/assets/previews/1656955727941.jpg" width="200" alt="login screen" /> | <img src="https://github.com/vhludnev/tracking-app-rn/blob/main/frontend/assets/previews/1656955727948.jpg" width="200" alt="track list screen" /> | <img src="https://github.com/vhludnev/tracking-app-rn/blob/main/frontend/assets/previews/1656955727961.jpg" width="200" alt="create new track screen" /> |

<br/><br/>

| Track detail screen | User profile screen tab |
| ------ | ------ |
| <img src="https://github.com/vhludnev/tracking-app-rn/blob/main/frontend/assets/previews/1656955727958.jpg" width="200" alt="track detail screen" /> | <img src="https://github.com/vhludnev/tracking-app-rn/blob/main/frontend/assets/previews/1656955727954.jpg" width="200" alt="post screen" /> |

<br/><br/>

## Installation

The app requires [Node.js](https://nodejs.org/) v16+ and expo cli to run smoothly.

Install the dependencies and devDependencies first. _Example:_

```sh
git clone https://github.com/vhludnev/tracking-app-rn.git
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
