import { Card, CardContent, CardHeader, Paper} from "@mui/material";
import React from "react";
import ReactMarkdown from 'react-markdown'
import type { Post } from "../store/apis/postsApi";
import { selectPostsFromAnywhere } from "../store/apis/postsApi";
 import remarkGfm from 'remark-gfm'
 import remarkBreaks from 'remark-breaks'
 import rehypeSanitize from 'rehype-sanitize'
 import { useSelector } from "react-redux";
 import { type RootState } from "../store";
 import timeAgo from "../utils/timeAgo";
import ReactionPicker from "../features/reactions/components/ReactionPicker";
function PostItem({ postId, postsPage, children}: { postId:string, postsPage?:boolean, children?:React.ReactNode}){
    //triggers fetchposts if i navigate to posts/$postid and theres no fetchposts cache
    const post:Post = useSelector((state: RootState) => selectPostsFromAnywhere(state, postId))! //temp non null assertion cause im logging in selectpostsfromanywhere selector where ill beusing nullish coalescing instead which ensures no undefined return
    let lineClamp; 
    let hoverStyle;
    
    if (postsPage) {
        lineClamp = "line-clamp-3"
        hoverStyle = "hover:bg-gray-100 cursor-pointer"

    }
    return (
        <div className={`w-full mx-auto px-4 max-w-screen-sm py-2  `}>
        <Paper elevation={3} className="">
        <Card variant="outlined" >
            <CardHeader
                title={post?.title}
                subheader={timeAgo(post?.createdAt)}
            />
        <CardContent className={`${hoverStyle}`}>
            <div>
                {post?.user.name}
            </div>
            <div className={`text-left ${lineClamp} text-sm list-decimal`}>
                <MarkReactDown content={post?.content}/>
            </div>
            <ReactionPicker reactionCounts = {post.reactionCounts}></ReactionPicker> 
        </CardContent>
        {children && <>{children}</>}
        </Card>
        </Paper>
        </div>
    )
}
export const MarkReactDown = ({content} : {content:string}) => {
    return <ReactMarkdown
                components={{
                    ol: ({ ...props }) => <ol className="list-decimal pl-6" {...props} />,
                    a: ({...props}) => <a className="underline text-[#334b5b] break-words" {...props} />
                }}
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeSanitize]}
                >
                    {content}
                </ReactMarkdown>
}
export default React.memo(PostItem)