import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { useHttp } from '../../hooks/use-http'
import { playerCreated } from '../../slices/players-slice'

function PlayersAddForm() {

	const dispatch = useDispatch()
	const {request} = useHttp()

	const onSubmit = (e) => {

		e.preventDefault()
		const name = e.target.name.value
		const country = e.target.country.value
		const continent = e.target.continent.value

		
		const data = {
			id: uuidv4(),
			name,
			country,
			continent
		}

		request('http://localhost:8002/players', 'POST', JSON.stringify(data))
			.then(res => console.log(res, 'Succesfull'))
			.then( dispatch(playerCreated(data)))
			
		e.target.reset()
	}

	return (
		<div className='px-4 py-6 bg-white rounded-md shadow-lg bg-gradient-to-tr from-cyan-600 to-transparent bg-opacity-10'>
			<form onSubmit={onSubmit}>
				<div className='flex flex-col space-y-2'>
					<div>
						<label htmlFor='name' className='text-2xl'>New Football player</label>
						<input type="text" className='w-full block py-2 px-4 rounded-md mt-1' placeholder='Player Name' name='name'/>
					</div>

					<div>
						<label htmlFor='country' className='text-2xl'>Country</label>
						<input type="text" className='w-full block py-2 px-4 rounded-md mt-1' placeholder='Country' name='country'/>
					</div>

					<div>
						<label htmlFor='continent' className='text-2xl'>Select Continent</label>
						<select className='w-full block py-2 px-4 rounded-md mt-1'name='continent'>
							<option value="Europa">Europa</option>
							<option value="Asia">Asia</option>
							<option value="America">America</option>
							<option value="Africa">Africa</option>
						</select>
					</div>

					<button 
						type='submit' 
						className='px-3 py-2 bg-gradient-to-tr from-fuchsia-300 to-transparent rounded-md mt-2 hover:from-fuchsia-500'
					>
						Add player
					</button>
				</div>
			</form>
		</div>
	)
}

export default PlayersAddForm