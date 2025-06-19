import { useAppSelector } from "../hooks/hooks"
import { createSelector } from "@reduxjs/toolkit"
export function PostItem({id}: {id: string}){
    //input selectors
    const selectItems = state => state.posts;
    // Take the second arg, `postId`, and forward to the output selector
    //output selector arguments solely based on input selector results
    //hence theres no other way than this to pass additional argmunets through to the output selector
    //suggested to pass all the other values (other than state) as a single obj
    const selectPostId = (state, postId) => postId;
    //index
    //const selectPostsById = createSelector([selectItems, selectPostId], (posts, id) => posts[id])
    //used an example in createSelector behaviour to get the post
    //but dont know how to get using id prop name tho
    ///currently getting by index

    //by prop id
    //pattern in Reselect Usage Patterns 
    const selectPostById = createSelector([selectItems, selectPostId], (posts, id) => posts.find(post => post.id === id))

    const post = useAppSelector(state => selectPostById(state, id)) 
    // cant just do selectpostbyid() that'll call it 
    // need to return the selector
    //useselector will decide when to call it ie when params change - wrong
    // multiple arguments into selectpoststbyid selector
    //reselect will call all input selectors using that
    //ok thats not how - not dependent on the number of arguments or whether the arguments themselves have changed
    //its whether the inputselector's results have changed
    return (
        <p>{post?.title}</p>
    )
}