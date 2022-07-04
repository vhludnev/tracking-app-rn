// import '../_mockLocation'                               // uncomment if needed for testing purposes
import React, { useContext, useCallback } from 'react'
import { useIsFocused } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from 'react-native-elements'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'

const TrackCreateScreen = () => {
  const isFocused = useIsFocused()
  const { state: { recording }, addLocation } = useContext(LocationContext)

  const callback = useCallback(location => {
    addLocation(location, recording)
  }, [recording] )

  const [err] = useLocation(isFocused || recording, callback)

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 32, textAlign: 'center', marginVertical: 15 }}>Create a new Track</Text>
      <Map />
      {err ? <Text>Please grant us location access</Text> : null}
      <TrackForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default TrackCreateScreen