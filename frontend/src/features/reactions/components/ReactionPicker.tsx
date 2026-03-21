import type { IconType } from 'react-icons';
import type { ReactionType} from '../../../store/apis/postsApi'
import { FaAngry, FaHeart,  FaRegSadCry, FaFire,  FaRegSmile, FaRegThumbsUp} from "react-icons/fa";
import {useAddReactionMutation} from '../../../store/apis/postsApi'
import styles from './ReactionPicker.module.css'
import {selectUserReactionFromPosts, selectReactionCountsFromPosts} from '../selectors/ReactionSelectors'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { selectLoggedInUserId } from '../../../store/slices/authSlice';
import {useEffect, useRef,useState} from 'react'
const reactionIcons: Record<ReactionType, IconType>  = {
    "SAD":FaRegSadCry,
    "ANGRY":FaAngry,
    "WOW":FaFire,
    "HAHA":FaRegSmile,
    "LOVE":FaHeart,
    "LIKE":FaRegThumbsUp,
}
function ReactionPicker({ postId} : {postId:string}) {
    //console.log("render", performance.now())
    const [addReaction] = useAddReactionMutation({
        selectFromResult: () => ({})
    })
    const reactionCounts = useSelector((state:RootState) => selectReactionCountsFromPosts(state, postId))
    const userReaction = useSelector((state:RootState) => selectUserReactionFromPosts(state, postId))
    const loggedInUserId = useSelector(selectLoggedInUserId)
    const [animating, setAnimating] = useState<string | null>(null)

    //tried using state to animate counts. similar to how i use animating but having that class toggling logic is frustrating 
    //const [bump, setBump] = useState<string | null>(null)
    // useEffect(() => {
        
    //     console.log("useffect runs after changes "+performance.now());
    //     setBump(userReaction)
    // }, [reactionCounts, userReaction])

    const inFlightRef = useRef(false)

    // const handleClick = async () => {
    // if (inFlightRef.current) return

    // inFlightRef.current = true
    // try {
    //     await addReaction(...).unwrap()
    // } finally {
    //     inFlightRef.current = false
    // }
    // }

    const handleClick = async (postId:string, reactionType:ReactionType) => {
        //await delay(3000)
        setAnimating(reactionType)
        if (inFlightRef.current) return
        inFlightRef.current = true
        try {
            if(loggedInUserId) await addReaction({postId, reactionType, userReaction}).unwrap()
        } finally {
            console.log("inFlightRef.current",inFlightRef.current);
            
            inFlightRef.current = false
        }
    }
    const reactions = Object.entries(reactionCounts).map(([key, value]) => {
        const Icon = reactionIcons[key as ReactionType] //had to use a type assertion because Object.entries() always types keys as string even if the original object has more specific keys like we had
        const active = key === userReaction
        return (
            <div key={key}>
                <button 
                    //disabled={isLoading} //this is suppposed to be only ui but im using server state to block clicks 
                    className={`${animating === key ? styles.pop : ""} ${active ? styles.active : ""}`} 
                    onClick={() => handleClick(postId, key as ReactionType)}
                    onAnimationEnd={() => {
                        //console.log("render setAnimating(null)", performance.now())
                        setAnimating(null)
                    }}
                >
                    <Icon />
                </button>
                <div 
                    //this node rerendering when its value which we use as key changes and on first render. so animation will happen even on first render
                    //this is an alternate to usign state based rerender and animating via that
                    //the problem i faced there was complicated logic to apply classes like is these are true apply this class if it turns false dont
                    //but here we define a class and add a animation prop and elements with that class will animate no fuss
                    //also the reason i can use a potentially non unique value as key case each reaction component with key reaction can have only 1 child count so its ok to use it for rerender
                    //key={value}
                    //className={styles.count} 
                    className={`${animating === key ? styles.count : ""}`} 

                    style={{textAlign:"center"}}>{value}</div>
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