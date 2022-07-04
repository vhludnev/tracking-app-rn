import { /* getDistance, */ getPathLength, getSpeed, convertSpeed } from 'geolib'

const getDistancePath = (gpsData) => {
   return getPathLength(gpsData)
}

const getSpeedKmH = (a, b) => {
   const speedMpS = getSpeed(a, b)
   return convertSpeed(speedMpS, 'kmh')
   //return speedMpS
}

export { getDistancePath, getSpeedKmH }