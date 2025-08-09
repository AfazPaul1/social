import { Button } from "@mui/material";

export default function SaveButton({ isValid, isAddingPost, mode, isEditingPost}: { isValid:boolean, isAddingPost: boolean, mode?: "create" | "edit", isEditingPost:boolean}){
    let buttonLoadingTexts = "Posting"
    let buttonText = "Post"
    if (mode === "edit") {
        buttonLoadingTexts = "Saving"
        buttonText = "Save"
    }
    return <>
        <Button disabled={!isValid || isAddingPost || isEditingPost}  type="submit" className='self-end' variant='contained'>{isAddingPost? buttonLoadingTexts : buttonText}</Button>       
    </>
}