import { Button, Paper, TextField, Box} from '@mui/material';
import {useForm} from 'react-hook-form'
//import { useState } from 'react';
let renderCount = 0;
function CreatePostForm() {
    renderCount++
    console.log(renderCount);
    //const [title, setTitle] = useState("")
    const {register, handleSubmit } = useForm()
    return (
        <div>
            
            <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
                onSubmit={handleSubmit(data => {console.log(data)})} //{title: 'a', content: 'a'}
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4'>
            <TextField 
            required
            label="Post Title"
            className=''
            //onChange={e => setTitle(e.target.value)}
            {...register("title", {required: true, minLength: 10})} //register can take a option object in which we can give validation rules like required and min length
            //but theres no feedback if it fails some validation
            />
            <TextField 
            required
            label="Post Content"
            multiline
            rows={6}
            className='w-full'
            {...register("content", {required: true, minLength: 15})} //Each field is required to have a name as a key for the registration process.
            />
            <Button type="submit" className='self-end' variant='contained'>Save</Button>
            </Paper>

            </Box>
            
        </div>
    )
}

export default CreatePostForm