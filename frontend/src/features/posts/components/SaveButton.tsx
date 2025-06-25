import { Button } from "@mui/material";
export default function SaveButton({ isValid, isAddingPost}: { isValid:boolean, isAddingPost: boolean}){
    
    return <>
        <Button disabled={!isValid || isAddingPost}  type="submit" className='self-end' variant='contained'>{isAddingPost? "Posting" : "Post"}</Button>       
    </>
}