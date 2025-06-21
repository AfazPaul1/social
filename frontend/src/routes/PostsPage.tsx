import { createFileRoute } from '@tanstack/react-router'
import PostList from '../components/PostList'
export const Route = createFileRoute('/PostsPage')({
  component: PostList,
})
