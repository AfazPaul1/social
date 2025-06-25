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
// ✅ Case 1: With loader dispatch
// loader         3333
// api            3348  <-- initiated by loader
// loading        3436
// comprender     5423
// 	• The fetch starts early in the loader, even before the component mounts.
// 	• PostList logs "loading" during render (since data isn't ready).
// 	• Eventually, the data comes back and re-renders with "comprender".
// The key here is that the fetch starts early, saving time. The "api" line is before "loading", which confirms this.

// ❌ Case 2: Without loader dispatch
// loader         2030
// loading        2122
// loading        2137   
// api            2141
// comprender     4161
// 	• No prefetch — the fetch starts after PostList mounts.
// 	• Notice: loading appears twice before api. That’s odd. Reason: Hook 31 changed some internal react validation process
// 	• Only then the fetchBaseQuery kicks in.
//🎯 Difference the loader made:
// 	With Loader	Without Loader
// API fetch starts	~15ms after loader call	~110ms after component
// First loading	Happens after API start	Happens before API
// Total time to data	~2090ms	~2030ms
