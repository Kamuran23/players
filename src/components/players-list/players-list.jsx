import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { useHttp } from '../../hooks/use-http'
import { playerDeleted, playersFetched, playersFetching, playersFetchingError } from '../../slices/players-slice'
import Empty from '../empty/empty'
import Error from '../error/error'
import PlayersItem from '../players-item/players-item'
import Spinner from '../spinner/spinner'


function PlayersList() {
	const {playersLoadingStatus} = useSelector(state => state.players)

	const filteredPlayersSelector = createSelector(
		state => state.filters.activeFilter,
		state => state.players.players,
		(activeFilter, players) => {
			if(activeFilter === 'All') return players 
			else {
				return players.filter(item => item.continent == activeFilter)
			}
		}
	)

	const filteredPlayers = useSelector(filteredPlayersSelector)
	const dispatch = useDispatch()
	const {request} = useHttp()

	useEffect(() => {
		dispatch(playersFetching())

		request('http://localhost:8002/players')
			.then(data => dispatch(playersFetched(data)))
			.catch( () => dispatch(playersFetchingError() ))
	}, [])

	const onDelete = useCallback((id) => {
		request(`http://localhost:8002/players/${id}`, 'DELETE') 
			.then(dispatch(playerDeleted(id)))
	}, [request])

	if(playersLoadingStatus == 'loading'){
		return <Spinner classNames={'w-8 h-8 mx-auto my-auto'}/>
	}else if(playersLoadingStatus == 'error'){
		return <Error />
	}

	const playersList = () => {
		if(!filteredPlayers.length){
			return <Empty />
		}

		return filteredPlayers.map(({ id, ...props }) => (
			<PlayersItem key={id} id={id} {...props} onDelete={() => onDelete(id)}/>
		));
	}

	return (
		<div className='flex flex-col space-y-4 p-3 overflow-y-auto'>
			{playersList()}
		</div>
	)
}


export default PlayersList