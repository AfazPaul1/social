import type { ReactionType } from "../../../store/apis/postsApi";
import React from "react";
import { ReactionItem } from "./ReactionItem";
import styles from './ReactionPicker.module.css'
import {reactionIcons} from './icons'
export const ReactionButton = React.memo(({active, reactionType, onClick, postId}: {active:boolean, reactionType:ReactionType, onClick:( postId:string,reactionType:ReactionType, e:React.MouseEvent<HTMLButtonElement>, ) => void, postId:string}) => {
    const Icon = reactionIcons[reactionType]
    return (
        <div>
            <button 
                className={`${active ? styles.active : ""} `} 
                 onClick={(e) => onClick(postId, reactionType, e)}
            >
                <Icon />
            </button>
            <ReactionItem reactionType={reactionType as ReactionType} postId={postId}></ReactionItem>      
        </div>
        
    )
})