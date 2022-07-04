import React, { useEffect, useContext } from 'react'
//import Icon from 'react-native-vector-icons/FontAwesome'
import { View, StyleSheet } from 'react-native'
import { Context as AuthContext } from '../context/AuthContext'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'

const SignupScreen = ({ navigation }) => {
  //const [email, setEmail] = useState('')
  //const [password, setPassword] = useState('')
  const { state, signup, clearErrorMessage } = useContext(AuthContext)

  useEffect(() => {
    if (state.token && !state.loading) {
      navigation.navigate('Tabs', { screen: 'Track Create' }) 
    }
  }, [state.token])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      clearErrorMessage()
    })
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={signup}   // the same as onSubmit={({ email, password}) => signup({ email, password })}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account?"
        linkText="Sign in instead!"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: 100
  },
  inputs: {
    paddingHorizontal: 8, 
    paddingVertical: 10
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginBottom: 15,
  },
})

export default SignupScreen
