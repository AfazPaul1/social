import { createFileRoute } from '@tanstack/react-router'
import CreatePostForm from '../../features/posts/components/CreatePostForm'
export const Route = createFileRoute('/authenticatedRoute/createPost')({
  component: CreatePostForm,
})