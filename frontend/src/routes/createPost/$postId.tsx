import { createFileRoute } from '@tanstack/react-router'
import CreatePostForm from '../../features/posts/components/CreatePostForm'
import {z} from "zod"
const searchSchema = z.object({
    mode:z.enum(["create", "edit"]).optional()
})
export const Route = createFileRoute('/createPost/$postId')({
  validateSearch: searchSchema,
  component: function RouteComponent() {
    const {postId} = Route.useParams()
    const {mode} = Route.useSearch()
    return <CreatePostForm postId={postId} mode={mode} />
  }
})
