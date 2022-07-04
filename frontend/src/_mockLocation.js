import * as Location from 'expo-location'
import { LAT, LNG } from "@env"

const tenMetersWithDegrees = 0.0001

function generateRandomFloatInRange(min, max) {
  return (Math.random() * (max - min + 1)) + min
}

const getLocation = (increment) => {
  return {
    timestamp: Date.now(),
    coords: {
      speed: 5,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 147 + generateRandomFloatInRange(-2,1),
      longitude: +LNG + increment * tenMetersWithDegrees,
      latitude: +LAT + increment * tenMetersWithDegrees
    }
  }
}

let counter = 0

setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged', {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter)
  })
  counter++
}, 1000)
