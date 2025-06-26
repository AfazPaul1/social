import { Card, CardContent, Paper} from "@mui/material";
import React from "react";
import ReactMarkdown from 'react-markdown'
import type { Post } from "../store/slices/postsSlice";
 import remarkGfm from 'remark-gfm'
 import remarkBreaks from 'remark-breaks'
 import rehypeSanitize from 'rehype-sanitize'
function PostItem({ post, postsPage, children}: { post:Post, postsPage?:boolean, children?:React.ReactNode}){
    // const  {data: post} = useFetchPostsQuery(undefined, {
    //     selectFromResult: ({data}) => ({
    //         data: data?.find(post => post.id === id)
    //     })
    // })
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
        <CardContent className={`${hoverStyle}`}>
            <div className="text-left font-semibold text-md">
                {post?.title}
            </div>
            <div className={`text-left ${lineClamp} text-sm list-decimal`}>
                <MarkReactDown content={post?.content}/>
            </div>
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