import { createFileRoute } from '@tanstack/react-router'
import PostList from '../../components/PostList'
import { store } from '../../store'
import { postsApi } from '../../store/apis/postsApi'
//import { SkeletonSus } from '../../components/PostList'
export const Route = createFileRoute('/posts/')({
  loader: async () => {
    //console.log("loader", performance.now()); with loader 
    
    store.dispatch(postsApi.endpoints.fetchPosts.initiate(undefined))
    //await result.unwrap() // this blocks postlist mount
    //console.log('[Loader] Prefetch complete')
    return null 
  },
  component: () => (
      <PostList />
  ), 
//pendingComponent: SkeletonSus //we need this only if we await and the loader is blocking but here we are not blocking so this is skipped entirely 
})
