import { useAppSelector } from "../hooks/hooks"
export function PostItem({id}: {id: string}){
    const post = useAppSelector(state => state.posts.find(post => post.id === id))
    return (
        <p>{post?.title}</p>
    )
}