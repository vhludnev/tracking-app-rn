import createDataContext from './createDataContext'
import trackerApi from '../api/tracker'

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tracks':
      return action.payload
    case 'new_track_added':
      return action.payload
    case 'remove_track':
      return action.payload
    default:
      return state
  }
}

const fetchTracks = dispatch => async () => {
  try {
    const { data } = await trackerApi.get('/tracks')
    dispatch({ type: 'fetch_tracks', payload: data })
  } catch (e) {console.log(e)}
}
const createTrack = dispatch => async (name, locations) => {
  try {
    await trackerApi.post('/tracks', { name, locations })          // make a request to api
    dispatch({ type: 'new_track_added' })
  } catch (e) {console.log(e)}
}
const removeTrack = dispatch => async (id) => {
  try {
    await trackerApi.delete(`/tracks/${id}` )
    dispatch({ type: 'remove_track' })
  } catch (e) {console.log(e)}
}

export const { Provider, Context } = createDataContext(
  trackReducer,
  { fetchTracks, createTrack, removeTrack },
  []
)
