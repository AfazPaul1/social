import { Paper, TextField, Box} from '@mui/material';
import {useForm, Controller} from 'react-hook-form'
import WordCount from './WordCount';
import SaveButton from './SaveButton';
import { useAddPostsMutation, useEditPostMutation, useFetchPostsByIdQuery } from '../../../store/apis/postsApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
export type FormData = {
        title: string
        content: string
    }
function CreatePostForm({postId, mode}: {postId?:string, mode?:"edit" | "create"}) {
    const [addPosts, {isLoading: isAddingPost}] = useAddPostsMutation()
    // const {post}  = useFetchPostsQuery(undefined, {
    //     selectFromResult: result => ({
    //         ...result,
    //         post:result.data?.find(post => post.id === postId)
            
    //     })
    // })
    //const {title, content} = post
    //const dispatch = useAppDispatch()
    const {data, isFetching} = useFetchPostsByIdQuery(!postId? skipToken: postId)
    
    const { handleSubmit, control, formState: { isValid}, reset } = useForm<FormData>({
        mode: "onChange", 
        defaultValues: {
            title: "",
            content: "",
        }
    })
    useEffect(() => {
        console.log("data changed useeffect");
        
        reset({title: data?.title, content: data?.content})
    }, [data, reset])
    const handleCreatePost = handleSubmit(async (data) => {
                        try {
                            await addPosts(data).unwrap()
                            reset()
                        } catch {
                            console.log("post failed");
                        }
                    })
                    console.log(data);
                    
    const [editPost, {isLoading: isEditingPost}] = useEditPostMutation()
    const navigate = useNavigate()
    const handleEditPost = handleSubmit(async (data) => {
        
        try {
            await editPost({...data, postId}).unwrap()
            if(postId) navigate({to:'/posts/$postId', params:{postId}})
            reset()
        } catch {
            console.log("edit failed");
        }
    })
    let content;
    if (isFetching) {
        content="loading"
    } else {
        content=<>
        <Box className='w-full sm:max-w-xl mx-auto my-2'
                component="form"
                onSubmit={mode === "edit" ? handleEditPost :handleCreatePost}
            >
            <Paper elevation={3} className='flex flex-col gap-4 p-4 m-2'>
            <Controller 
                name="title"
                control={control}
                rules={{required: "This is required",minLength: {value: 5, message: "Minimum length is 5"}}}
                render={({field, fieldState}) => (
                    <TextField 
                        disabled={isAddingPost || isEditingPost}
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
                        disabled={isAddingPost || isEditingPost}
                        label="Post Content"
                        sx={{'& .MuiFormHelperText-root': {textAlign: 'right'}}}
                        multiline
                        minRows={5}
                        maxRows={Infinity}
                        {...field}
                        className='w-full'
                        error={!!fieldState.error} 
                        helperText={fieldState.error? fieldState.error.message : `${field.value?.length}/1000 `}
                    />
                )}
            />
            <SaveButton isValid = {isValid} isAddingPost={isAddingPost} mode={mode} isEditingPost={isEditingPost}/>
            </Paper>

            </Box>
        </>
    }
    return (
        <div>
            {content}
            
        </div>
    )
}

export default CreatePostForm