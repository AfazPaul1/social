import { useAppSelector, useAppDispatch } from "../hooks/hooks"
import { useMemo, useState } from "react";
import { makeSelectPostById } from "../store/slices/postsSlice"; // Import the factory
import React from "react";
import { Button } from "@mui/material";
function PostItem({id}: {id: string}){
    const [counter, setCounter] = useState(0)
    const selectPostByIdMemo  = useMemo(makeSelectPostById, [])
    console.log(`PostItem ${id} re-rendering!`);
    const post = useAppSelector(state => selectPostByIdMemo(state, id)) 
    // need to return the selector
    //useselector will decide when to call it ie when params change - wrong
    // multiple arguments into selectpoststbyid selector
    //reselect will call all input selectors using that
    //ok thats not how - not dependent on the number of arguments or whether the arguments themselves have changed
    //its whether the inputselector's results have changed
    return (
        <>
        <p>{post?.title}</p>
        <Button onClick={() => setCounter(prev => prev+1)}>increment</Button>
        <h3>{counter}</h3>
        </>
    )
}
export default React.memo(PostItem)