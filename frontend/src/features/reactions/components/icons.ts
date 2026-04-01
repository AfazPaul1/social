import { FaRegAngry, FaRegHeart,  FaRegSadCry,   FaRegSmile, FaRegThumbsUp} from "react-icons/fa";
import {AiOutlineFire} from 'react-icons/ai'
import type { IconType } from "react-icons";
import type { ReactionType } from "../../../store/apis/postsApi";
export const reactionIcons: Record<ReactionType, IconType>  = {
    "SAD":FaRegSadCry,
    "ANGRY":FaRegAngry,
    "WOW":AiOutlineFire,
    "HAHA":FaRegSmile,
    "LOVE":FaRegHeart,
    "LIKE":FaRegThumbsUp,
}