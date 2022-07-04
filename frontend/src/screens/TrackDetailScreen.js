import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { StackActions } from '@react-navigation/native'
import Spacer from '../components/Spacer'
import { Context as TrackContext } from '../context/TrackContext'
import MapView, { Polyline } from 'react-native-maps'
import { getDistancePath, getSpeedKmH } from '../components/TrackHelpers'
import { intervalToDuration } from 'date-fns'
import { Icon } from 'react-native-elements'

const TrackDetailScreen = ({ navigation, route }) => {
  const [ trackArr, setTrackArr ] = useState([])
  const [ speed, setSpeed ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const [ altitudeArr, setAltitudeArr ] = useState([])
  const [ altitudeRange, setAltitudeRange ] = useState([])
  const { state, removeTrack } = useContext(TrackContext)
  const { _id } = route.params
  //const _id = navigation.getParam('_id')    /* former version of react-navigation prop */
  const track = state.find(t => t._id === _id)
  const initialCoords = track.locations[0].coords
  
  useEffect(() => {
    let dataArr = []
    let altitudeArr = []
    track.locations.forEach(tr => {
      const {coords: { latitude, longitude, speed, altitude } , timestamp} = tr
      dataArr.push({ latitude, longitude, speed, altitude, time: timestamp })
      altitudeArr.push(+altitude.toFixed())
    })
    setTrackArr(dataArr)
    setAltitudeArr(altitudeArr)
    setDuration(intervalToDuration({start: +dataArr[0].time, end: +dataArr[dataArr.length - 1].time}))
  }, [])

  useEffect(() => {
    let speedArrData = []
    let altitudeChangeArr = []
    
    for (let i = 0; i < trackArr.length; i++) {
      if (i+1 < trackArr.length) {
        speedArrData.push(getSpeedKmH(trackArr[i],trackArr[i+1]))
        altitudeChangeArr.push(altitudeArr[i+1]-altitudeArr[i])
      }
    }
    // altitude change difference calculation
    const positiveAltArr = altitudeChangeArr.filter(function (a) { return a >= 0; })
    const negativeAltArr = altitudeChangeArr.filter(function (a) { return a < 0; })

    let sumPlus = positiveAltArr.reduce(((a, b) => a + b), 0 )
    let sumMinus = negativeAltArr.reduce(((a, b) => a + b), 0 ) 
    setAltitudeRange([sumPlus, sumMinus])

    setSpeed(((speedArrData.reduce((a, b) => a + b, 0))/speedArrData.length).toFixed(2))
  }, [trackArr])

  const handleRemoveTrack = () => {
    Alert.alert(
      `Remove track "${track.name}"`,
      'Are you sure you want to remove this track?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        { text: 'Delete', 
          style: 'destructive', 
          onPress() {
            removeTrack(_id)
            navigation.dispatch(StackActions.popToTop())
          }
        }
      ],
      { cancelable: false }
    )
  }
 
  if (!track) {
    return null
  }

  return (
    <>
      <Text style={{ fontSize: 32, textAlign: 'center', marginVertical: 15, textTransform: 'capitalize' }}>{track.name}</Text>
      <MapView
        initialRegion={{
          longitudeDelta: 0.01,
          latitudeDelta: 0.01,
          ...initialCoords
        }}
        style={styles.map}
      >
        <Polyline 
          strokeColor="green"
          strokeWidth={2}
          coordinates={track.locations.map(loc => loc.coords)} />
      </MapView>
      <Spacer>
        <View>
          <Text><Icon type='material-community' name='map-marker-distance' size={12} color='#00aced'/>{' '}
            Distance: {getDistancePath(trackArr)} meters</Text>
        </View>
        <View>
          <Text style={{paddingVertical: 5}}><Icon type='material-community' name='run-fast' size={12} color='#517fa4'/>{' '}
            Average speed: {speed} km/h</Text>
        </View> 
        <View style={{flexDirection: 'row'}}>
          <Text><Icon type='foundation' name='mountains' size={12} color='#aa7c60'/>{' '}
            Altitude: {' '}
          </Text>
          <Text>
            <Icon type='ionicon' name='arrow-up' size={12} color='green'/>{`${altitudeRange[0]} m  `}
            <Icon type='ionicon' name='arrow-down' size={12} color='coral'/>{`${Math.abs(altitudeRange[1])} m`}
          </Text>
        </View> 
        <View>
          <Text style={{paddingVertical: 5}}><Icon type='ionicon' name='md-timer-outline' size={12} color='#f50'/>{' '}
            Duration: {`${duration.minutes} min ${duration.seconds}`} sec </Text>
        </View>   
      </Spacer>
      <Spacer />
      <Spacer style={{justifyContent: 'center', alignSelf: 'center'}}>
        <Icon
          raised
          name='trash'
          type='font-awesome'
          color='#f50'
          size={20}
          onPress={handleRemoveTrack} 
        />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  map: {
    height: 300
  }
})

export default TrackDetailScreen