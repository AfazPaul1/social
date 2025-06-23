import { useAppSelector} from "../hooks/hooks"
import    PostItem  from "./PostItem"
import { selectPostIds} from "../store/slices/postsSlice" //memoized selector
import { Link } from "@tanstack/react-router"
export default function PostList() {
    //console.log("postList");
    const postIds = useAppSelector(selectPostIds)
    const postList = postIds.map(
        (postId:string) => 
        <Link 
            key={postId} 
            to={'/posts/$postId'}
            params={{postId}}
            >
        <PostItem  id={postId} lineClamp="line-clamp-5  "/>
        </Link>)
    return (
        <div className="grid sm:max-w-xl mx-auto">
            {postList}
        </div>
        
    )
}