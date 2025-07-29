import {useForm, Controller} from 'react-hook-form'
import { TextField, Stack, Typography, Button } from '@mui/material'
import { useRegisterMutation } from '../store/apis/authApi'
interface registerFormData {
        name:string,
        email:string,
        password:string
    }
export function RegisterForm() {
    const {control,handleSubmit, reset} = useForm<registerFormData>({
        defaultValues:{
            name:"",
            password:"",
            email:""
        }
    })
    const [register, {isLoading}] = useRegisterMutation()
    const handleRegisterSubmit = handleSubmit(async (data) => {
            try {
                await register(data).unwrap()
                reset({
                email:"",
                password:"",
                name:""
            })
            } catch (error) {
                
                console.log(error);
            }
    })
    return (
        <Stack onSubmit={handleRegisterSubmit} spacing={3} component="form"  className='sm:max-w-xl mx-auto px-3 py-3'>
            <div className='self-start'>
                <Typography variant='h4' className='font-bold'>Sign up</Typography>
                <Typography>to continue</Typography>
            </div>
            <Controller 
            name="name"
            control={control}
            rules={{
                required: "This is required",
                }}
            render={({field,fieldState}) => (
                <TextField
                    disabled={isLoading}
                    className='w-full mb-4'
                    label="Name"
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error? fieldState.error.message : ""}
                />

            )

            }
            />
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
                    disabled={isLoading}
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
                        disabled={isLoading}
                        label="Password"
                        className='w-full mb-2'
                        {...field}
                        error={!!fieldState.error}
                        helperText={fieldState.error? fieldState.error.message : ""}
                    />

                )

                }
            />
            <Button disabled={isLoading} type='submit' variant='contained' className='self-center'>{isLoading? "Signing up" :"Sign up"}</Button>
        </Stack>
            
       
    )
    


}