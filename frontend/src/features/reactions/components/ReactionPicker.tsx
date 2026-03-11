import type { IconType } from 'react-icons';
import type { ReactionType} from '../../../store/apis/postsApi'
import { FaAngry, FaHeart,  FaRegSadCry, FaFire,  FaRegSmile, FaRegThumbsUp} from "react-icons/fa";
// const reactionCountsNew:reactionCountsType = {
//         "SAD":0,
//         "ANGRY":0,
//         "WOW":0,
//         "HAHA":0,
//         "LOVE":0,
//         "LIKE":0,
//     } // backend handles defaults like angry:0 so no need 
const reactionIcons: Record<ReactionType, IconType>  = {
    "SAD":FaRegSadCry,
    "ANGRY":FaAngry,
    "WOW":FaFire,
    "HAHA":FaRegSmile,
    "LOVE":FaHeart,
    "LIKE":FaRegThumbsUp,
}
function ReactionPicker({reactionCounts} : {reactionCounts: Record<ReactionType, number>}) {
    const reactions = Object.entries(reactionCounts).map(([key, value], index) => {
        const Icon = reactionIcons[key as ReactionType] //had to use a type assertion because Object.entries() always types keys as string even if the original object has more specific keys like we had
        return (
            <div key={index}>
                <Icon />
                <div style={{textAlign:"center"}}>{value}</div>
            </div>
        )
    })
    return (
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
            {reactions}
        </div>
    )
}
export default ReactionPicker