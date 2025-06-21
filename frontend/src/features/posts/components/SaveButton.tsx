import { useWatch } from "react-hook-form";
import type { Control } from "react-hook-form";
import type { FormData } from "./CreatePostForm";
import { Button } from "@mui/material";
export default function SaveButton({control}: {control: Control<FormData>}){
    const useDisBut = ({control} : {control:Control<FormData>}) => {
        const [content, title] =  useWatch({name:["content", "title"],  control})
        return content.length >= 5 && title.length >= 5
    }
    console.log(useDisBut({control}));
    
    return <>
        <Button disabled={!useDisBut({control})}  type="submit" className='self-end' variant='contained'>Save</Button>       
    </>
}