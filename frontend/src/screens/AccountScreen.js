import React, { useEffect, useContext } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-elements'
import Spacer from '../components/Spacer'
import { Context as AuthContext } from '../context/AuthContext'

const AccountScreen = ({ navigation }) => {
  const { signout, state: { token, email, loading } } = useContext(AuthContext)
  const signOutHandler = async () => {
    await signout()
  }

  useEffect(() => {
    !token && !loading && navigation.navigate('Signin') 
  }, [loading, token])

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 32, textAlign: 'center', marginBottom: 10, marginTop: 25}}>User profile</Text>
      <Spacer><Text style={{ fontSize: 22, textAlign: 'center'}}>{email}</Text></Spacer>
      <Spacer>
        <View style={[styles.buttonsWrapper, {marginTop: '10%'}]}>
          <Button containerStyle={styles.buttonContainer} title="Sign Out" onPress={signOutHandler} />
        </View>
      </Spacer>
    </SafeAreaView>
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

export default AccountScreen