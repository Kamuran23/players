import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	players: [],
	playersLoadingStatus: 'succes',
}

const playersSlice = createSlice({
	name: "playersReducer",
	initialState,
	reducers: {
		playersFetching:  state => {
			state.playersLoadingStatus = 'loading'
		},
		playersFetched:  (state, action) => {
			state.playersLoadingStatus = 'succes',
			state.players = action.payload
		},
		playersFetchingError:  (state) => {
			state.playersLoadingStatus = 'error'
		},
		playerCreated:  (state, action) => {
			state.filteredPlayers = state.activeFilter === 'All',
			state.players.push(action.payload)
		},
		playerDeleted:  (state, action) => {
			state.filteredPlayers = state.activeFilter === 'All' ? state.players.filter(player => player.id !== action.payload) : state.players.filter(player => player.id !== action.payload).filter(item => item.continent == state.activeFilter),
			state.players = state.players.filter(player => player.id !== action.payload)
		}
	}
})

const {actions, reducer} = playersSlice

export default reducer
export const {
	playersFetching,
	playersFetched,
	playerCreated,
	playerDeleted,
	playersFetchingError
} = actions