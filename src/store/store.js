import { configureStore } from '@reduxjs/toolkit'
import filtersReducer from '../slices/filters-slice'
import playersReducer from '../slices/players-slice'

const stringMiddleware = () => (next) => action => {
	if(typeof action === 'string'){
		return next({type: action})
	}

	return next(action)
}

// const enhancer = (createStore) => (...args) => {
// 	const store = createStore(...args)

// 	const oldDispatch = store.dispatch

// 	store.dispatch = action => {
// 		if(typeof action === 'string') {
// 			return oldDispatch({
// 				type: action
// 			})
// 		}

// 		return oldDispatch(action)
// 	}

// 	return store
// }

// const store = legacy_createStore(
// 	combineReducers({players: playersReducer, filters: filtersReducer}),
// 	compose( applyMiddleware(thunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )

const store = configureStore({
	reducer: {players: playersReducer, filters: filtersReducer},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
	devTools: true
})

export default store