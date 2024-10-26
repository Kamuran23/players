import errorImg from '../../assets/error.png'

function Error() {
	return (
		<div className='flex justify-center items-center w-full h-full'>
			<img src= {errorImg} alt="error" className='object-cover'/>
		</div>
	)
}

export default Error