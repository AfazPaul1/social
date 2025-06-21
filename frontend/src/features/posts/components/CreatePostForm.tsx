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
function CreatePostForm() {
    const dispatch = useAppDispatch()
    const {register, handleSubmit, control, formState: {errors, isValid} } = useForm<FormData>({
        mode: "onChange", 
        defaultValues: {
            title: "",
            content: "",
        }
    })
    return (
        <div>
            
            <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
                onSubmit={handleSubmit(data => dispatch(addPost({ id: nanoid(), ...data})))} //{title: 'a', content: 'a'}
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4'>
            <TextField 
            label="Post Title"
            sx={{'& .MuiFormHelperText-root': {textAlign: 'right'}}}
            {...register("title", {required: "This is required", minLength: {value: 5, message: "Minimum length is 5"}})}
            error={!!errors.title}
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
                        error={!!fieldState.error} 
                        helperText={fieldState.error? fieldState.error.message : `${field.value.length}/1000 `}
                    />
                )}
            />
            <SaveButton isValid = {isValid}/>
            </Paper>

            </Box>
            
        </div>
    )
}

export default CreatePostForm