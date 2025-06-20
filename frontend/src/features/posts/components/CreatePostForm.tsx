import { Button, Paper, TextField, Box,} from '@mui/material';
import {useForm, Controller} from 'react-hook-form'
//import { useState } from 'react';
let renderCount = 0;
function CreatePostForm() {
    renderCount++
    console.log(renderCount);
    //const [title, setTitle] = useState("")
    type FormData = {
        title: string
        content: string
        contentTwo: string
    }
    const {register, handleSubmit, control, formState: {errors} } = useForm<FormData>({
        defaultValues: {
            title: "",
            content: "",
            contentTwo: ""
        } //this kinda behaves like a typescript type check 
        //these names match those field names hence if we typo it shows an error so recommended to give initial values
    })
    console.log(errors);
    
    return (
        <div>
            
            <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
                onSubmit={handleSubmit(data => {console.log(data)})} //{title: 'a', content: 'a'}
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4'>
            <TextField 
            label="Post Title"
            className=''
            //onChange={e => setTitle(e.target.value)}
            {...register("title", {required: "This is required", minLength: {value: 5, message: "Minimum length is 5"}})} //register can take a option object in which we can give validation rules like required and min length
            //but theres no feedback if it fails some validation
            />
            <TextField 
            label="Post Content"
            multiline
            rows={6}
            className='w-full'
            error={errors.content? true :false }
            helperText={errors.content?.message}
            {...register("content", {required: "This is required", minLength: {value: 5, message: "Minimum length is 5"}})} //Each field is required to have a name as a key for the registration process.
             />

            <Controller 
                name="contentTwo"
                control={control}
                rules={{required: "This is required",minLength: {value: 5, message: "Minimum length is 5"}}}
                render={({field, fieldState}) => (
                    <TextField 
                        label="Post Content"
                        multiline
                        rows={6}
                        {...field}
                        className='w-full'
                        error={!!fieldState.error} //double negation suppose no error itll conver undefined to false
                        helperText={fieldState.error?.message}

                    />
                )}
            />
            
            <Button type="submit" className='self-end' variant='contained'>Save</Button>
            </Paper>

            </Box>
            
        </div>
    )
}

export default CreatePostForm