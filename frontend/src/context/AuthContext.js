import AsyncStorage from '@react-native-async-storage/async-storage'
import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, loading: false, errorMessage: action.payload }
    case "loading":
      return { ...state, loading: action.payload }
    case "signin":
      return { errorMessage: "", loading: false, token: action.payload.token, email: action.payload.email }
    case "clear_error_message":
      return { ...state, errorMessage: "" }
    case "signout":
      return { token: null, email: null, loading: false, errorMessage: "" }
    default:
      return state
  }
}

const tryLocalSignin = (dispatch) => async () => {
  try {
    const token = await AsyncStorage.getItem("token")
    const email = await AsyncStorage.getItem("email")
    if (token && email) {
      //await dispatch({ type: "signin", payload: token })
      dispatch({ type: "signin", payload: {token, email} })
    } else {
      dispatch({ type: "loading", payload: false })
    }
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    })
  }
}

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
}

const signup = dispatch => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signup', { email, password })
    //await AsyncStorage.setItem("token", data.token)                               // AsyncStorage - for keeping login data on the device                           
    await AsyncStorage.multiSet([["token", data.token],["email", data.email]])
    //dispatch({ type: "signin", payload: data.token })
    dispatch({ type: "signin", payload: {token: data.token, email: data.email} })
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign up",
    })
  }
}

const signin = (dispatch) => async ({ email, password }) => { 
  try {
    const { data } = await trackerApi.post("/signin", { email, password })
    //await AsyncStorage.setItem("token", data.token)
    await AsyncStorage.multiSet([["token", data.token],["email", data.email]])
    dispatch({ type: "signin", payload: {token: data.token, email: data.email} })
  } catch (err) {
    dispatch({
      type: "add_error",
      payload: "Something went wrong with sign in",
    })
  }
}

const signout = (dispatch) => async () => {
  //await AsyncStorage.removeItem("token")
  await AsyncStorage.multiRemove(["token", "email"])
  dispatch({ type: "signout" })
}

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },       // actions
  { token: null, email: null, errorMessage: "", loading: true }         // initialState
)
