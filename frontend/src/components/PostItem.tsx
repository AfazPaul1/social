import { Card, CardContent, Typography, Paper} from "@mui/material";
import React from "react";
import ReactMarkdown from 'react-markdown'
import type { Post } from "../store/slices/postsSlice";
 import remarkGfm from 'remark-gfm'
 import remarkBreaks from 'remark-breaks'
 import rehypeSanitize from 'rehype-sanitize'
//import { useFetchPostsQuery } from "../store/apis/postsApi";
function PostItem({ post, lineClamp}: { post:Post, lineClamp?: string, }){
    // const  {data: post} = useFetchPostsQuery(undefined, {
    //     selectFromResult: ({data}) => ({
    //         data: data?.find(post => post.id === id)
    //     })
    // })
    return (
        <div className="w-full mx-auto px-4 max-w-screen-sm py-2">
        <Paper elevation={3} className="">
        <Card variant="outlined" >
        <CardContent>
            <Typography className="text-left">
                {post?.title}
            </Typography>
            <Typography className={`text-left ${lineClamp}`} variant="body2" component={"div"}>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    rehypePlugins={[rehypeSanitize]}
                >
                    {post?.content}
                </ReactMarkdown>
            </Typography>
        </CardContent>
        </Card>
        </Paper>
        </div>
    )
}
export default React.memo(PostItem)