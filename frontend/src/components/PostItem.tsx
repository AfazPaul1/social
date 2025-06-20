import { useAppSelector } from "../hooks/hooks"
import { useMemo } from "react";
import { makeSelectPostById } from "../store/slices/postsSlice"; 
import { Card, CardContent, Typography, Paper} from "@mui/material";
import {Stack} from "@mui/material";
import React from "react";
import ReactMarkdown from 'react-markdown'
function PostItem({id}: {id: string}){
    const selectPostByIdMemo  = useMemo(makeSelectPostById, [])
    //console.log(`PostItem ${id} re-rendering!`);
    const post = useAppSelector(state => selectPostByIdMemo(state, id)) 
    return (
        <div className="p-1 m-2">
        <Paper elevation={3} className="">
            <Stack>
        <Card variant="outlined" >
        <CardContent>
            <Typography className="text-left">
                {post?.title}
            </Typography>
            <Typography className="text-left line-clamp-5" variant="body2" component={"div"}>
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </Typography>
        </CardContent>
        </Card>
        </Stack>
        </Paper>
        </div>
    )
}
export default React.memo(PostItem)