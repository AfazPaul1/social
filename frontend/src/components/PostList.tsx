import    PostItem  from "./PostItem"
import { useFetchPostsQuery } from "../store/apis/postsApi"
import { Skeleton } from "@mui/material";
//  import { useSelector } from "react-redux";
//  import { type RootState } from "../store";
//  import {selectIds} from '../store/apis/postsApi'
 function PostList() {
    const emptyIds: string[] = []

    const { ids, isFetching } = useFetchPostsQuery(undefined, {
      selectFromResult: ({ data, isFetching }) => ({
        ids: data?.ids ?? emptyIds,
        isFetching
      })
})
    //const ids = useSelector((state:RootState) => selectIds(state)) //using just this instead of selecting from result too causes rerender havent loooked into it much tho
    let content;
     if (isFetching) {
         content = <SkeletonSus/>
    } else if(ids.length) {
        content = ids?.map((id: string) => <PostItem key={id}  postId={id} postsPage/>)
    }
    return (
                <>
                {content}
                </>
    )
}
export default PostList
export const SkeletonSus = () => {
     const placeholders = Array.from({ length: 5 })
    return (
        <div className="space-y-4 max-w-screen-sm mx-auto px-4 py-2"> 
      {placeholders.map((_, index) => (
        <Skeleton
          key={index}
          variant="rounded"
          className="w-full"
          height={172}
        />
      ))}
    </div>
    )
}