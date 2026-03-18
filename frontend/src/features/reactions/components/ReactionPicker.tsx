import type { IconType } from 'react-icons';
import type { ReactionType} from '../../../store/apis/postsApi'
import { FaAngry, FaHeart,  FaRegSadCry, FaFire,  FaRegSmile, FaRegThumbsUp} from "react-icons/fa";
import {useAddReactionMutation} from '../../../store/apis/postsApi'
import styles from './ReactionPicker.module.css'
import {selectUserReactionFromPosts, selectReactionCountsFromPosts} from '../selectors/ReactionSelectors'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { selectLoggedInUserId } from '../../../store/slices/authSlice';
import {useState} from 'react'
const reactionIcons: Record<ReactionType, IconType>  = {
    "SAD":FaRegSadCry,
    "ANGRY":FaAngry,
    "WOW":FaFire,
    "HAHA":FaRegSmile,
    "LOVE":FaHeart,
    "LIKE":FaRegThumbsUp,
}
function ReactionPicker({ postId} : {postId:string}) {
    const [addReaction, {isLoading}] = useAddReactionMutation()
    const reactionCounts = useSelector((state:RootState) => selectReactionCountsFromPosts(state, postId))
    const userReaction = useSelector((state:RootState) => selectUserReactionFromPosts(state, postId))
    const loggedInUserId = useSelector(selectLoggedInUserId)
    const [animating, setAnimating] = useState<string | null>(null)
    const handleClick = (postId:string, reactionType:ReactionType) => {
        setAnimating(reactionType)
        if(loggedInUserId) addReaction({postId, reactionType, userReaction})
    }
    const reactions = Object.entries(reactionCounts).map(([key, value]) => {
        const Icon = reactionIcons[key as ReactionType] //had to use a type assertion because Object.entries() always types keys as string even if the original object has more specific keys like we had
        const active = key === userReaction
        return (
            <div key={key}>
                <button 
                    disabled={isLoading}
                    className={`${animating === key ? styles.pop : ""} ${active ? styles.active : ""}`} 
                    onClick={() => handleClick(postId, key as ReactionType)}
                    onAnimationEnd={() => setAnimating(null)}
                >
                    <Icon />
                </button>
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