import { useState, useEffect } from 'react'
import { Accuracy, requestForegroundPermissionsAsync,  watchPositionAsync/* , getCurrentPositionAsync */ } from 'expo-location'

export default (shouldTrack, callback) => {
  const [err, setErr] = useState(null)

  useEffect(() => {
    let subscriber

    const startWatching = async () => {
      //let location = await getCurrentPositionAsync({})
      //console.log(location)

      try {
        const { status } = await requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          throw new Error('Location permission not granted')
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback // aka. (location) => { addLocation(location) }
        )
      } catch (e) {
        setErr(e)
      }
    }

    if (shouldTrack) {
      startWatching()       // start tracking
    } else {
      if (subscriber) {
        subscriber.remove()
      }     
      subscriber = null     // stop tracking
    }

    return () => {
      if (subscriber) {
        subscriber.remove()
      }
    }
  }, [shouldTrack, callback])

  return [err]
}
