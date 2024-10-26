import { createReducer } from '@reduxjs/toolkit'
import { playerCreated, playerDeleted, playersFetched, playersFetching, playersFetchingError } from '../slices/players-slice'

const initialState = {
	players: [],
	playersLoadingStatus: 'succes',
}

const playersReducer = createReducer(initialState, builder => {
	builder
		.addCase(playersFetching, state => {
			state.playersLoadingStatus = 'loading'
		})
		.addCase(playersFetched, (state, action) => {
			state.playersLoadingStatus = 'succes',
			state.players = action.payload
		})
		.addCase(playersFetchingError, state => {
			state.playersLoadingStatus = 'error'
		})
		.addCase(playerCreated, (state, action) => {
			state.filteredPlayers = state.activeFilter === 'All',
			state.players.push(action.payload)
		})
		.addCase(playerDeleted, (state, action) => {
			state.filteredPlayers = state.activeFilter === 'All' ? state.players.filter(player => player.id !== action.payload) : state.players.filter(player => player.id !== action.payload).filter(item => item.continent == state.activeFilter),
			state.players = state.players.filter(player => player.id !== action.payload)
		})
		.addDefaultCase( () => {})
})

// const playersReducer = (state = initialState, action) => {
// 	switch(action.type){

// 		case "PLAYERS_FETCHING":
// 			return {
// 				...state,
// 				playersLoadingStatus: 'loading'
// 			}

// 		case "PLAYERS_FETCHED":
// 			return {
// 				...state,
// 				players: action.payload,
// 				filteredPlayers: state.activeFilter === 'All' ? state.players : state.players.filter(item => item.continent == state.activeFilter),
// 				playersLoadingStatus: 'succes'
// 			}

// 		case "PLAYERS_FETCHING_ERROR":
// 			return {
// 				...state,
// 				playersLoadingStatus: 'error'
// 			}

// 		case "PLAYER_CREATED":
// 			return {
// 				...state,
// 				filteredPlayers: state.activeFilter === 'All' ? [...state.players, action.payload] : [...state.players, action.payload].filter(item => item.continent == state.activeFilter),
// 				players: [...state.players, action.payload]
// 			}

// 		case "PLAYER_DELETED":
// 			return {
// 				...state,
// 				players: state.players.filter(player => player.id !== action.payload),
// 				filteredPlayers: state.activeFilter === 'All' ? state.players.filter(player => player.id !== action.payload) : state.players.filter(player => player.id !== action.payload).filter(item => item.continent == state.activeFilter),
// 			}
		
// 		default:
// 			return state;
// 	}
// }

export default playersReducer
