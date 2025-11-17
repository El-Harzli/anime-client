import RankCard from "./RankCard"
import { FaPlus } from "react-icons/fa6";


function SideBarCard({data}) {
  return (
    <div className=" flex items-center justify-between gap-x-3">
        <RankCard anime={data} />
        <FaPlus className="text-white/25" />
    </div>
  )
}

export default SideBarCard