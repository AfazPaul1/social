import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '../components/LoginForm'
import {z} from "zod"
const searchSchema = z.object({
    redirect:z.string().optional()
})
export const Route = createFileRoute('/login')({
  component: LoginForm,
  validateSearch: searchSchema
})
