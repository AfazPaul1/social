import { useAppSelector} from "../hooks/hooks"
import    PostItem  from "./PostItem"
import { selectPostIds} from "../store/slices/postsSlice" //memoized selector

export default function PostList() {
    //console.log("postList");
    const postIds = useAppSelector(selectPostIds)
    const postList = postIds.map((postId:string) => <PostItem key={postId} id={postId} />)
    return (
        <div className="grid sm:max-w-xl mx-auto">
            {postList}
        </div>
        
    )
}