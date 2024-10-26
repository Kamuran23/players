import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHttp } from '../../hooks/use-http'
import { activeFilterChanged, filtersFetched, filtersFetching, filtersFetchingError } from '../../slices/filters-slice'
import Spinner from '../spinner/spinner'

function PlayersFilter() {
	const {filters, filtersLoadingStatus} = useSelector(state => state.filters)
	const dispatch = useDispatch()
	const {request} = useHttp()

	useEffect( () => {
		dispatch(filtersFetching())

		request('http://localhost:8002/filters')
		.then(data => dispatch(filtersFetched(data)))
		.catch( () => dispatch(filtersFetchingError()))
	}, [])

	if(filtersLoadingStatus == 'loading'){
		return <Spinner classNames={'w-8 h-8 mx-auto my-auto'}/>
	}else if(filtersLoadingStatus == 'error'){
		return <span className='text-red-500'>Something went wrong</span>
	}


	const renderFilters = () => {
		if(!filters.length){
			return <span className='text-red-500'>Something went wrong</span>
		}

		return filters.map( ({id, label, classNames}) => (
			<button key={id} className={ `${classNames} mr-3 w-full` } onClick={ () => dispatch(activeFilterChanged(label)) }> {label} </button>
		))
	}
	return (
		<div className='px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-br from-cyan-600 to-transparent bg-opacity-10 mt-4'>
			<h1 className='text-xl font-bold'>Filter Players</h1>

			<div className='flex mt-2'>
				{renderFilters()}
			</div>
		</div>
	)
}

export default PlayersFilter