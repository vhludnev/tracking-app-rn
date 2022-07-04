import React, { useState, useContext, useEffect } from "react"
import { Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { ListItem, Icon } from "react-native-elements"
import { format } from 'date-fns'
import { Context as TrackContext } from "../context/TrackContext"
import { Context as AuthContext } from "../context/AuthContext"

const TrackListScreen = ({ navigation }) => {
  const [ show, setShow ] = useState(false)
  const { state, fetchTracks } = useContext(TrackContext)
  const { state: stateAuth } = useContext(AuthContext)

  useEffect(() => {
    !stateAuth.token && !stateAuth.loading && navigation.navigate('Signin')
  }, [stateAuth.token, stateAuth.loading])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      fetchTracks()
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    stateAuth.token && fetchTracks()
  }, [JSON.stringify(state)])
 

  const trackDate = (elem) => {
    const { locations } = elem
    const { timestamp } = locations[0]
    return format(new Date(+timestamp), 'dd.MM.yyyy / HH:mm') 
  }

  // for Loading indicator
  useEffect(() => {
    if (!state || !state.length) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [JSON.stringify(state)])

  if (show/* !state || !state.length */) {
    setTimeout(() => {
      setShow(false)
    }, 2000)
  }

  return (
    <>
      {show && <ActivityIndicator size="large" color="#517fa4" style={{paddingTop: 15}} />}
      {state && !state.length && !show && <Text style={{ fontSize: 20, textAlign: 'center', marginTop: 20}}>No tracks recorded yet</Text>}
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("TrackDetail", { _id: item._id })}>
              <ListItem bottomDivider>
                <Icon
                  name='route'
                  type='font-awesome-5'
                  color='#517fa4' />
                <ListItem.Content>
                  <ListItem.Title>{item.name || 'No name'}</ListItem.Title>
                  <ListItem.Subtitle>{trackDate(item)}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron color="#517fa4" size={24} />
              </ListItem>
            </TouchableOpacity>
          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({})

export default TrackListScreen