import { useAppSelector } from "../hooks/hooks"
import { useMemo } from "react";
import { makeSelectPostById } from "../store/slices/postsSlice"; 
import { Card, CardContent, Typography, Paper} from "@mui/material";
import {Stack} from "@mui/material";
import React from "react";
import ReactMarkdown from 'react-markdown'
function PostItem({id}: {id: string}){
    const selectPostByIdMemo  = useMemo(makeSelectPostById, [])
    console.log(`PostItem ${id} re-rendering!`);
    const post = useAppSelector(state => selectPostByIdMemo(state, id)) 
    return (
        <>
        <div>
        <Paper elevation={3} className="p-2 m-2">
            <Stack className="justify-items-center w-full h-50 overflow-hidden ">
        <Card variant="outlined" >
        <CardContent>
            <Typography className="text-left" variant="subtitle1" component="div">
                {post?.title}
            </Typography>
            <Typography className="text-left" variant="body2">
                <ReactMarkdown>{post?.content}</ReactMarkdown>
            </Typography>
        </CardContent>
        </Card>
        </Stack>
        </Paper>
        </div>
        </>
    )
}
export default React.memo(PostItem)