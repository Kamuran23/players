const initialState = {
	players: [],
	playersLoadingStatus: 'succes',
	filtersLoadingStatus: 'succes',
	filters: [],
	activeFilter: 'All',
	filteredPlayers: [],
}

const reducer = (state = initialState, action) => {
	switch(action.type){

		case "PLAYERS_FETCHING":
			return {
				...state,
				playersLoadingStatus: 'loading'
			}

		case "PLAYERS_FETCHED":
			return {
				...state,
				players: action.payload,
				filteredPlayers: state.activeFilter === 'All' ? state.players : state.players.filter(item => item.continent == state.activeFilter),
				playersLoadingStatus: 'succes'
			}

		case "PLAYERS_FETCHING_ERROR":
			return {
				...state,
				playersLoadingStatus: 'error'
			}

		case "FILTERS_FETCHING":
			return {
				...state,
				filtersLoadingStatus: 'loading'
			}

		case "FILTERS_FETCHED":
			return {
				...state,
				filters: action.payload,
				filtersLoadingStatus: 'succes'
			}

		case "FILTERS_FETCHING_ERROR":
			return {
				...state,
				filtersLoadingStatus: 'error'
			}

		case "PLAYER_CREATED":
			return {
				...state,
				filteredPlayers: state.activeFilter === 'All' ? [...state.players, action.payload] : [...state.players, action.payload].filter(item => item.continent == state.activeFilter),
				players: [...state.players, action.payload]
			}

		case "PLAYER_DELETED":
			return {
				...state,
				players: state.players.filter(player => player.id !== action.payload),
				filteredPlayers: state.activeFilter === 'All' ? state.players.filter(player => player.id !== action.payload) : state.players.filter(player => player.id !== action.payload).filter(item => item.continent == state.activeFilter),
			}
		
		case 'FILTER_CHANGED':
			return {
				...state,
				activeFilter: action.payload,
				filteredPlayers: action.payload === 'All' ? state.players : state.players.filter(item => item.continent == action.payload)
			}

		default:
			return state;
	}
}

export default reducer
