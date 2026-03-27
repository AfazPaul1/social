import type { ReactionType} from '../../../store/apis/postsApi'
import {useAddReactionMutation} from '../../../store/apis/postsApi'
import {selectUserReactionFromPosts} from '../selectors/ReactionSelectors'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';
import { useCallback, type MouseEvent } from 'react';
import { selectLoggedInUserId } from '../../../store/slices/authSlice';
import {useRef} from 'react'
import { popAnimation, shakeAnimation } from '../../../animations/reactions';
import {ReactionButton} from './ReactionButton'
import {reactionIcons} from './icons'
function ReactionPicker({ postId} : {postId:string}) {
    const [addReaction] = useAddReactionMutation({
        selectFromResult: () => ({})
    })
    const userReaction = useSelector((state:RootState) => selectUserReactionFromPosts(state, postId))
    const loggedInUserId = useSelector(selectLoggedInUserId)

    const inFlightRef = useRef(false)
    
    const handleClickStable = useCallback(
        async (postId:string, reactionType:ReactionType, e: MouseEvent<HTMLButtonElement>) => {
        //await delay(3000)
        const el = e.currentTarget as HTMLElement
        
        if (inFlightRef.current) {
            shakeAnimation(el)
            return
        }
        popAnimation(el)
        inFlightRef.current = true
        try {
            if(loggedInUserId) await addReaction({postId, reactionType}).unwrap()
        } finally {
            console.log("inFlightRef.current",inFlightRef.current);
            
            inFlightRef.current = false
        }
    },
    [loggedInUserId, addReaction])

    const reactions = Object.entries(reactionIcons).map(([key]) => {
        const active = key === userReaction
        return (
            <ReactionButton 
            key={key} 
            active={active} 
            postId={postId} 
            reactionType={key as ReactionType} 
            onClick={handleClickStable}
            ></ReactionButton>
        )
    })
    return (
        <div style={{display:"flex", justifyContent:"space-evenly"}}>
            {reactions}
        </div>
    )
}
export default ReactionPicker