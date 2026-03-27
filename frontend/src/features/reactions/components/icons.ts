import { FaAngry, FaHeart,  FaRegSadCry, FaFire,  FaRegSmile, FaRegThumbsUp} from "react-icons/fa";
import type { IconType } from "react-icons";
import type { ReactionType } from "../../../store/apis/postsApi";
export const reactionIcons: Record<ReactionType, IconType>  = {
    "SAD":FaRegSadCry,
    "ANGRY":FaAngry,
    "WOW":FaFire,
    "HAHA":FaRegSmile,
    "LOVE":FaHeart,
    "LIKE":FaRegThumbsUp,
}