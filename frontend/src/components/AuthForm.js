import React, { useState } from 'react'
import { Keyboard, StyleSheet, View } from 'react-native'
import { Text, Button, Input, Icon } from 'react-native-elements'
import Spacer from './Spacer'

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <>
      <Spacer>
        <Text h3>{headerText}</Text>
      </Spacer>
      <View style={styles.inputs}>
        <Input
          label="Email"
          selectionColor='grey'
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={
            <Icon
              type='font-awesome'
              name='envelope'
              size={20}
              color='grey'
              style={{paddingRight: 10}}
            />
          }
        />
        <Input
          secureTextEntry
          label="Password"
          selectionColor='grey'
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          autoCorrect={false}
          leftIcon={
            <Icon
              type='font-awesome'
              name='lock'
              size={28}
              color='grey'
              style={{paddingRight: 10}}
            />
          }
        />
      </View>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => {onSubmit({ email, password }); Keyboard.dismiss(); setEmail(''); setPassword('')}}
        />
      </Spacer>
    </>
  )
}

const styles = StyleSheet.create({
  inputs: {
    paddingHorizontal: 8, 
    paddingVertical: 10
  },
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginBottom: 15,
  }
})

export default AuthForm
