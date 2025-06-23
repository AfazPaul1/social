import { createFileRoute } from '@tanstack/react-router'
import PostItem from '../../components/PostItem'
export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {postId} = Route.useParams()
  return (
    <div className='grid sm:max-w-xl mx-auto'>
      <PostItem id = {postId}></PostItem>
    </div>
  )
}
