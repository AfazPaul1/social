import { Button, Paper, TextField, Box} from '@mui/material';
//import { useState } from 'react';
let renderCount = 0;
function CreatePostForm() {
    renderCount++
    console.log(renderCount);
    //const [title, setTitle] = useState("")
    
    return (
        <div>     
            <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4'>
            <TextField 
            required
            label="Post Title"
            className=''
            //onChange={e => setTitle(e.target.value)}
            />
            <TextField 
            required
            label="Post Content"
            multiline
            rows={6}
            className='w-full'
            />
            <Button type="submit" className='self-end' variant='contained'>Save</Button>
            </Paper>
            </Box>  
        </div>
    )
}

export default CreatePostForm