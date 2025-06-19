import { useAppSelector, useAppDispatch } from "../hooks/hooks"
import { useMemo, useState } from "react";
import { makeSelectPostById } from "../store/slices/postsSlice"; 
import React from "react";
import { Button } from "@mui/material";
import { editPost } from "../store/slices/postsSlice";
function PostItem({id}: {id: string}){
    const dispatch = useAppDispatch()
    const [counter, setCounter] = useState(0)
    const selectPostByIdMemo  = useMemo(makeSelectPostById, [])
    console.log(`PostItem ${id} re-rendering!`);
    const post = useAppSelector(state => selectPostByIdMemo(state, id)) 
    // cant just do selectpostbyid() that'll call it - 
    // correction: can do useAppSelector(selectPostsById)ig its ok to just pass the function but then we cant pass it additional arguments cause itll always get called with root state
    // solution is to pass an anonymous selector to useSelector, and then immediately call the real selector with both state and any additional arguments
    // need to return the selector
    //useselector will decide when to call it ie when params change - wrong
    return (
        <>
        <p>{post?.title}</p>
        <Button onClick={() => setCounter(prev => prev+1)}>increment</Button>
        <h3>{counter}</h3>
        <Button onClick={() => dispatch(editPost({id, changes: {title:"michael"}}))}>change</Button>
        </>
    )
}
//explored various iteration like having the factory ahere and memoizing, not memoizing, no factory no memoize at all
export default React.memo(PostItem)