import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import Spacer from './Spacer'
import { useNavigation } from '@react-navigation/native'

const NavLink = ({ text, linkText, routeName }) => {
  const navigation = useNavigation()

  return (
    <Spacer style={{flexDirection: 'row'}}>
      <Text>{text}</Text>
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Text style={styles.link}>{linkText}</Text>
      </TouchableOpacity>
    </Spacer>
  )
}

const styles = StyleSheet.create({
  link: {
    paddingLeft: 6,
    color: 'blue'
  }
})

export default NavLink
