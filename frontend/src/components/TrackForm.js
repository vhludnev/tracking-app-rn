import React, { useContext } from 'react'
import { Input, Button, Icon } from 'react-native-elements'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Spacer from './Spacer'
import { Context as LocationContext } from '../context/LocationContext'
import { Context as TrackContext } from '../context/TrackContext'
import useSaveTrack from '../hooks/useSaveTrack'

const TrackForm = () => {
  const { state: { name, recording, locations }, startRecording, stopRecording, changeName, reset } = useContext(LocationContext)
  const [saveTrack] = useSaveTrack()
  const { fetchTracks } = useContext(TrackContext)
  const navigation = useNavigation()

  const saveTrackHandler = () => {
    saveTrack()
    fetchTracks()
    navigation.navigate('TrackList') 
  }

  return (
    <>
      <Spacer /* style={styles.inputWrapper} */>
        <Input
          value={name}
          style={{textAlign: 'center'}}
          maxLength={100}
          onChangeText={changeName}
          placeholder="Enter track's name"
        />
      </Spacer>
      <View style={styles.buttonsWrapper}>
      {recording ? (<>
        <Icon
          name='ios-pause-circle-outline'
          type='ionicon'
          color='coral' 
          size={60} 
          onPress={stopRecording} />
        </>
      ) : (  
        <>     
          {locations.length ? (
            <View style={{flexDirection: 'row', width: '100%', height: 60, justifyContent: 'space-evenly', alignItems: 'center'}}>
              <Icon
                name={'ios-save-outline'}
                type='ionicon'
                color='#517fa4' 
                size={34} 
                onPress={saveTrackHandler} />

              <Icon
                name={'ios-play-circle-outline'}
                type='ionicon'
                color='green' 
                size={60} 
                onPress={startRecording} />

              <Icon
                name={'delete-outline'}
                type='material'
                color='red' 
                size={36} 
                onPress={reset} />
            </View>
            ) : (       
            <Button 
              title="Start Recording"
              type="solid"
              buttonStyle={{ borderWidth: 2, borderRadius: 6}}
              containerStyle={styles.buttonContainer}
              onPress={startRecording} />
            )
          }
        </>
      )}     
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  buttonsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50
  }
})

export default TrackForm
