import { createReducer } from '@reduxjs/toolkit'
import { activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError } from '../slices/filters-slice'

const initialState = {
	filtersLoadingStatus: 'succes',
	filters: [],
	activeFilter: 'All',
	filteredPlayers: [],
}

const filtersReducer = createReducer(initialState, builder => {
	builder
		.addCase(filtersFetching, state => {
			state.filtersLoadingStatus = 'loading'
		})
		.addCase(filtersFetched, (state, action) => {
			state.filtersLoadingStatus = 'succes',
			state.filters = action.payload
		})
		.addCase(filtersFetchingError, (state) => {
			state.filtersLoadingStatus = "error"
		})
		.addCase(activeFilterChanged, (state, action) => {
			state.activeFilter = action.payload
		})
		.addDefaultCase( () => {})
})

// const filtersReducer = (state = initialState, action) => {
// 	switch(action.type){

// 		case "FILTERS_FETCHING":
// 			return {
// 				...state,
// 				filtersLoadingStatus: 'loading'
// 			}

// 		case "FILTERS_FETCHED":
// 			return {
// 				...state,
// 				filters: action.payload,
// 				filtersLoadingStatus: 'succes'
// 			}

// 		case "FILTERS_FETCHING_ERROR":
// 			return {
// 				...state,
// 				filtersLoadingStatus: 'error'
// 			}
		
// 		case 'FILTER_CHANGED':
// 			return {
// 				...state,
// 				activeFilter: action.payload,
// 			}

// 		default:
// 			return state;
// 	}
// }

export default filtersReducer
