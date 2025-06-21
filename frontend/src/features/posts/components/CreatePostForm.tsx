import { Paper, TextField, Box,} from '@mui/material';
import {useForm, Controller} from 'react-hook-form'
//import { useFormState } from 'react-hook-form';
import { useAppDispatch } from '../../../hooks/hooks';
import { addPost } from '../../../store/slices/postsSlice';
import { nanoid } from '@reduxjs/toolkit';
import WordCount from './WordCount';
import SaveButton from './SaveButton';
export type FormData = {
        title: string
        content: string
    }
//let renderCount = 0;
function CreatePostForm() {
    const dispatch = useAppDispatch()
    //renderCount++
    //console.log(renderCount);
    const {register, handleSubmit, control, formState: {errors} } = useForm<FormData>({
        defaultValues: {
            title: "",
            content: "",
        }
    })
    //const title = watch("title")
    //const formState = useFormState({control})
    //console.log(formState);
    
    
    
    return (
        <div>
            
            <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
                onSubmit={handleSubmit(data => dispatch(addPost({ id: nanoid(), ...data})))} //{title: 'a', content: 'a'}
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4'>
            <TextField 
            label="Post Title"
            sx={{'& .MuiFormHelperText-root': {textAlign: 'right'}}} //& is a selector ref "Inside this TextField, find the element with class .MuiFormHelperText-root and apply textAlign: 'right'."
            {...register("title", {required: "This is required", minLength: {value: 5, message: "Minimum length is 5"}})} //register can take a option object in which we can give validation rules like required and min length
            error={!!errors.title}
            //helperText={errors.title? errors.title.message :`${title.length} /300`}//watch inside same component is unnecessary? wait its not? chatgpt said no other way we can get it only way is to convert into using a controller
            helperText={errors.title? errors.title.message : <WordCount control={control}/>}
            />
            <Controller 
                name="content"
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
                        helperText={fieldState.error? fieldState.error.message : `${field.value.length}/1000 `}
                    />
                )}
            />
            
            {/* <Button disabled={title.length < 5} type="submit" className='self-end' variant='contained'>Save</Button> */}
            <SaveButton control={control} />
            </Paper>

            </Box>
            
        </div>
    )
}

export default CreatePostForm