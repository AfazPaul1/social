import type { ReactionType } from "../../../store/apis/postsApi";
import React from "react";
import { ReactionItem } from "./ReactionItem";
import styles from './ReactionPicker.module.css'
import {reactionIcons} from './icons'
//import { popAnimation, shakeAnimation } from "../../../animations/reactions";
export const ReactionButton = React.memo(({active, reactionType, onClick, postId, inFlightRef}: {active:boolean, reactionType:ReactionType, onClick:( postId:string,reactionType:ReactionType, e:React.MouseEvent<HTMLButtonElement>, ) => void, postId:string, inFlightRef:React.RefObject<boolean>}) => {
    const Icon = reactionIcons[reactionType]
    return (
        <div>
            <button 
                className={`${active ? styles.active : ""} `} 
                onPointerDown={(e) => { //visual feedback on mobile when pressing on button but not clicking
                    const el = e.currentTarget
                    el.style.transform = "scale(0.92)"
                }}
                onPointerUp={(e) => {
                    const el = e.currentTarget
                     el.style.transform = ""
                }}
                 onClick={(e) => onClick(postId, reactionType, e)}
            >
                <Icon />
            </button>
            <ReactionItem reactionType={reactionType as ReactionType} postId={postId}></ReactionItem>      
        </div>
        
    )
})