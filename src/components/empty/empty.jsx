import emptyImg from '../../assets/empty.png'

function Empty() {
	return (
		<div className='flex justify-center items-center w-full h-full'>
			<img src= {emptyImg} alt="error" className='object-cover'/>
		</div>
	)
}

export default Empty