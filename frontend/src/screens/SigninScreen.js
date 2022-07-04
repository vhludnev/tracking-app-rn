import React, { useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { Context as AuthContext } from '../context/AuthContext'

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage, tryLocalSignin } = useContext(AuthContext)

  useEffect(() => {
    if (state.token && !state.loading) {
      navigation.navigate('Tabs', { screen: 'Track List' }) 
    }
  }, [state])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      clearErrorMessage()
      tryLocalSignin()
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account?"
        linkText="Sign up instead!"
        routeName="Signup"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100
  },
})

export default SigninScreen