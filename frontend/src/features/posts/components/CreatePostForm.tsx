import { Paper, TextField, Box,} from '@mui/material';
import {useForm, Controller} from 'react-hook-form'
//import { useFormState } from 'react-hook-form';
//import { useAppDispatch } from '../../../hooks/hooks';
//import { addPost } from '../../../store/slices/postsSlice';
//import { nanoid } from '@reduxjs/toolkit';
import WordCount from './WordCount';
import SaveButton from './SaveButton';
import { useAddPostsMutation } from '../../../store/apis/postsApi';
export type FormData = {
        title: string
        content: string
    }
function CreatePostForm() {
    const [addPosts, {isLoading: isAddingPost}] = useAddPostsMutation()
    //const dispatch = useAppDispatch()
    const { handleSubmit, control, formState: { isValid}, reset } = useForm<FormData>({
        mode: "onChange", 
        defaultValues: {
            title: "",
            content: "",
        }
    })
    const handleCreatePost = handleSubmit(async (data) => {
                        // const result = await addPosts(data)
                        //    if(result.data){
                        //         reset()
                        //    } 
                        try {
                            await addPosts(data).unwrap()
                            reset()
                        } catch {
                            console.log("post failed");
                        }
                        //dispatch(addPost({ 
                        //id: nanoid(), ...data
                    //}))
                    })
    return (
        <div>
            <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
                onSubmit={handleCreatePost}
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4 m-2'>
            <Controller 
                name="title"
                control={control}
                rules={{required: "This is required",minLength: {value: 5, message: "Minimum length is 5"}}}
                render={({field, fieldState}) => (
                    <TextField 
                        disabled={isAddingPost}
                        label="Post Title"
                        sx={{'& .MuiFormHelperText-root': {textAlign: 'right'}}}
                        {...field}
                        className='w-full'
                        error={!!fieldState.error} 
                        helperText={fieldState.error? fieldState.error.message : <WordCount control={control}/>}
                    />
                )}
            />
            <Controller 
                name="content"
                control={control}
                rules={{required: "This is required",minLength: {value: 5, message: "Minimum length is 5"}}}
                render={({field, fieldState}) => (
                    <TextField 
                        disabled={isAddingPost}
                        label="Post Content"
                        sx={{'& .MuiFormHelperText-root': {textAlign: 'right'}}}
                        multiline
                        minRows={5}
                        maxRows={Infinity}
                        {...field}
                        className='w-full'
                        error={!!fieldState.error} 
                        helperText={fieldState.error? fieldState.error.message : `${field.value.length}/1000 `}
                    />
                )}
            />
            <SaveButton isValid = {isValid} isAddingPost={isAddingPost}/>
            </Paper>

            </Box>
            
        </div>
    )
}

export default CreatePostForm