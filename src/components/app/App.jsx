import PlayersFilter from '../players-filter/players-filter'
import PlayersAddForm from '../players-form/players-add-form'
import PlayersList from '../players-list/players-list'

function App() {
	return (
		<div className='w-full h-screen relative app'>
			<div className='absolute inset-0 bg-black/70 blur-3xl z-10'></div>

			<div className='grid grid-cols-2 gap-4 container max-w-6xl mx-auto h-full z-50 relative pt-12'>
				<PlayersList/>
				<div>
					<PlayersAddForm/>
					<PlayersFilter/>
				</div>
			</div>
		</div>
	)
}

export default App