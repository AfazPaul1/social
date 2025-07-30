import {useForm, Controller} from 'react-hook-form'
import { TextField, Stack, Typography, Button } from '@mui/material'
import { useLoginMutation } from '../store/apis/authApi'
import { useRouter } from '@tanstack/react-router'
//import { Route } from '../routes/login' //we can now get access to those route emthods here
interface loginFormData {
    email:string,
    password:string
}
export function LoginForm() {
    const router = useRouter()
    //const search = Route.useSearch()
    //console.log(router,search);
    
    const {control, handleSubmit, reset} = useForm<loginFormData>({
        defaultValues: {
                email:"",
                password:""
            }
    })
    const [login, {isLoading}] = useLoginMutation()
    const handleFormSubmit = handleSubmit(async (data) => {
        try {
            await login(data).unwrap()
            reset({
                email:"",
                password:""
            })
            const redirect = router.latestLocation.search.redirect
            if(redirect) router.history.push(redirect)
            
        } catch {
            console.log("login failed");
        }
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
            <Button disabled={isLoading} type='submit' variant='contained' className='self-center'>{isLoading? "Signing in" :"Sign in"}</Button>
        </Stack>
            
       
    )
    


}