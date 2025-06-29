import {useForm, Controller} from 'react-hook-form'
import { TextField, Stack, Typography, Button } from '@mui/material'
export function LoginForm() {

    const {control, handleSubmit} = useForm()
    const handleFormSubmit = handleSubmit(() => {
        console.log("submitted");
        
    })
    return (
        <Stack onSubmit={handleFormSubmit} spacing={3} component="form"  className='sm:max-w-xl mx-auto px-3 py-3'>
            <div className='self-start'>
                <Typography variant='h4' className='font-bold'>Sign in</Typography>
                <Typography>to continue</Typography>
            </div>

            <Controller 
            name="email"
            control={control}
            rules={{
                required: "This is required",
                pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message:"Invalid email address"
                }
                }}
            render={({field,fieldState}) => (
                <TextField
                    className='w-full mb-4'
                    label="Email"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error? fieldState.error.message : ""}
                />

            )

            }
            />
            <Controller 
                name="password"
                control={control}
                rules={{
                    required: "This is required",
                    minLength: {
                        value:16,
                        message: "Minimum Length is 16"
                    }
                    }}
                render={({field,fieldState}) => (
                    <TextField
                        label="Password"
                        className='w-full mb-2'
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error? fieldState.error.message : ""}
                    />

                )

                }
            />
            <Button type='submit' variant='contained' className='self-center'>Sign in</Button>
        </Stack>
            
       
    )
    


}