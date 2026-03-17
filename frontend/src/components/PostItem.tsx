import { Card, CardContent, CardHeader, Paper} from "@mui/material";
import React from "react";
 import { useSelector } from "react-redux";
 import { type RootState } from "../store";
 import timeAgo from "../utils/timeAgo";
import ReactionPicker from "../features/reactions/components/ReactionPicker";
import { useNavigate } from '@tanstack/react-router';
import {PostContent} from '../features/posts/components/PostContent'
import {selectPostTitleFromPosts, selectPostCreatedAtFromPosts, selectPostUserNameFromPosts} from '../features/posts/selectors/selectors'
function PostItem({ postId, postsPage, children}: { postId:string, postsPage?:boolean, children?:React.ReactNode}){
    const navigate = useNavigate()
    //triggers fetchposts if i navigate to posts/$postid and theres no fetchposts cache
    const title = useSelector((state: RootState) => selectPostTitleFromPosts(state, postId))! //temp non null assertion cause im logging in selectpostsfromanywhere selector where ill beusing nullish coalescing instead which ensures no undefined return
    const createdAt = useSelector((state: RootState) => selectPostCreatedAtFromPosts(state, postId))
    const userName = useSelector((state: RootState) => selectPostUserNameFromPosts(state, postId))
    let lineClamp; 
    let hoverStyle;
    
    if (postsPage) {
        lineClamp = "line-clamp-3"
        hoverStyle = "hover:bg-gray-100 cursor-pointer"

    }
    return (
        <div className={`w-full mx-auto px-4 max-w-screen-sm py-2  `}>
        <Paper elevation={3} className="">
        <Card variant="outlined" onClick={() => navigate({ to:'/posts/$postId', params: { postId } })}>
            <CardHeader
                title={title}
                subheader={timeAgo(createdAt)}
            />
        <CardContent className={`${hoverStyle}`}>
            <div>
                {userName}
            </div>
            <div className={`text-left ${lineClamp} text-sm list-decimal`}>
                <PostContent postId={postId}></PostContent>
            </div>
        </CardContent>
        </Card>
        {children && <>{children}</>}
        <ReactionPicker postId= {postId} ></ReactionPicker> 
        </Paper>
        </div>
    )
}
export default PostItem