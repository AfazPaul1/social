import { Button } from "@mui/material";
export default function SaveButton({ isValid}: { isValid:boolean}){
    
    return <>
        <Button disabled={!isValid}  type="submit" className='self-end' variant='contained'>Save</Button>       
    </>
}