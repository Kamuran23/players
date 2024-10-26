import { FaFontAwesomeFlag } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { IoFootball } from "react-icons/io5"
import player from "../../assets/player.png"

function PlayersItem( {name, continent, country, onDelete} ) {
	let backgroundClases = ""

	switch(continent){
		case "Asia":
			backgroundClases = "bg-gradient-to-r from-blue-400 to-blue-700"
			break;
		case "America":
			backgroundClases = "bg-gradient-to-r from-green-500 to-green-700"
			break;
		case 'Africa':
			backgroundClases = "bg-gradient-to-r from-red-400 to-red-600"
			break;
		case 'Europa':
			backgroundClases = "bg-gradient-to-l from-orange-400 to-orange-700"
			break;
	}
	return (
		<div className={`${backgroundClases} p-4 grid grid-cols-2 shadow-lg rounded-md items-center relative`}>
				<div className="flex flex-col space-y-2">
					<div className="flex items-center gap-1">
						<IoFootball className="w-6 h-6"/>
						<p className="font-bold text-xl">{name}</p>
					</div>

					<div className="flex items-center gap-1">
						<FaFontAwesomeFlag className="w-6 h-6"/>
						<p className="font-bold text-xl">{country}</p>
					</div>
				</div>

				<img src={player} alt="" className="h-24 ml-auto"/>

				<span className="absolute -top-3 -right-2 bg-slate-300 rounded-full p-1 transition-all hover:bg-slate-500" role="button" onClick={onDelete}>
					<IoMdClose className="h-5 w-5"/>
				</span>
			</div>
	)
}

export default PlayersItem