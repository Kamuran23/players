import { createSlice } from '@reduxjs/toolkit'


const initialState = {
	filtersLoadingStatus: 'succes',
	filters: [],
	activeFilter: 'All',
	filteredPlayers: [],
}

const filtersSlice = createSlice({
	name: "filtersReducer",
	initialState,
	reducers: {
		filtersFetching: state => {
			state.filtersLoadingStatus = 'loading'
		},
		filtersFetched: (state, action) => {
			state.filtersLoadingStatus = 'succes',
			state.filters = action.payload
		},
		filtersFetchingError: (state) => {
			state.filtersLoadingStatus = "error"
		},
		activeFilterChanged: (state, action) => {
			state.activeFilter = action.payload
		}
	}
})

const {reducer, actions} = filtersSlice

export default reducer
export const {
	filtersFetching,
	filtersFetched,
	filtersFetchingError,
	activeFilterChanged
} = actions