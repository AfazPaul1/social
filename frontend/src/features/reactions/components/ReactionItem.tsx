import { useSelector } from "react-redux";
import type { ReactionType } from "../../../store/apis/postsApi";
import { selectReactionCountsFromPosts } from "../selectors/ReactionSelectors";
import type { RootState } from "../../../store";
import { useEffect, useRef } from "react";
import { bumpAnimation } from "../../../animations/reactions";
import styles from './ReactionPicker.module.css'


export const  ReactionItem = function ReactionItem ({reactionType, postId}: {reactionType: ReactionType, postId:string}) {
    const reactionCount = useSelector ((state:RootState) => selectReactionCountsFromPosts(state, postId, reactionType))
    const countRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (countRef.current) {
            bumpAnimation (countRef.current)
        }
    }, [reactionCount])
    return (
        <div      
            ref={countRef}
            style={{textAlign:"center"}}
            className={styles.count}
        >
            {reactionCount}
        </div>
    )
}