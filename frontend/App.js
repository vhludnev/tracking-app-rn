import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { Icon } from 'react-native-elements'

import AccountScreen from './src/screens/AccountScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'
import TrackListScreen from './src/screens/TrackListScreen'

import { Provider as AuthProvider, Context as AuthContext } from './src/context/AuthContext'
import { Provider as LocationProvider } from './src/context/LocationContext'
import { Provider as TrackProvider } from './src/context/TrackContext'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const LoginFlow = () => {
  const { state } = useContext(AuthContext)
  return (
    <Stack.Navigator 
      initialRouteName="Tabs"
      screenOptions={{headerShown: false}}
    >
      {!state.token !== null && !state.loading &&
        <Stack.Screen
          name="Tabs"
          component={TabStack}
        /> }
      <>
        <Stack.Screen 
          name="Signin" 
          component={SigninScreen} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
        />
      </>
      
    </Stack.Navigator>
  )
}

export const TrackListFlow = () => {
  return (
    <Stack.Navigator 
      screenOptions={{headerTitleAlign: 'center'}}
    >
      <Stack.Screen 
        name="TrackList" 
        component={TrackListScreen}
        options={{title: 'Tracks', headerLeft: () => null}}
      />
      <Stack.Screen 
        name="TrackDetail" 
        component={TrackDetailScreen} 
        options={{title: 'Track Detail'}}
      />
    </Stack.Navigator>
  )
}

const TabStack  = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, 
        tabBarStyle: { paddingBottom: 4 }
      }}
    >
      <Tab.Screen 
        name="Track List Flow" 
        component={TrackListFlow} 
        options={
          {tabBarLabel: 'Track List', tabBarIcon: ({ color, size }) => <Icon
              type='font-awesome'
              name='list-alt'
              size={20}
              color={color}
              style={{paddingTop: 6}}
            />
          }} 
      />
      <Tab.Screen 
        name="Track Create" 
        component={TrackCreateScreen} 
        options={{tabBarLabel: 'Add Track', tabBarIcon: ({ color, size }) => <Icon
          type='font-awesome'
          name='plus'
          size={20}
          color={color}
          style={{paddingTop: 6}}
        />}} />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{tabBarLabel: 'Account', tabBarIcon: ({ color, size }) => <Icon
          type='font-awesome'
          name='gear'
          size={20}
          color={color}
          style={{paddingTop: 6}}
        />}} />
    </Tab.Navigator>
  )
}

const AppNavigation = () => {
  return (
    <AuthProvider>
      <TrackProvider>
        <LocationProvider>
          <NavigationContainer fallback={<Text>Loading...</Text>}>
            <LoginFlow />
          </NavigationContainer> 
        </LocationProvider>
      </TrackProvider>
    </AuthProvider>
  )
}

export default AppNavigation