import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../index";
interface Post {
    id: string,
    title:string,
    content:string
}
const initialState: Post[] = [
    {
        id: '0',
        title: 'Today I am happy that finally all my hardwork paid off',
        content: `
TLDR; Finally with luck and hardwork entirely I am able to secure an off campus job of **17lpa**! Have been struggling a lot to get a job, did everything to succeed. All dev, made super solid profile, did open source, freelance, got internship experience, worked for product and companies, learnt soft skills and management.

Being skilled and still useless really feels very bad. 3 weeks back I even left my job because of extreme tension even though I didn’t have a job. The only reason was I knew I can, I don’t want to lose my potential here. I want to give a fight.

Today I finally got something that I never dreamt of. Coming from tier 3 college, _7 lpa was always my dream_. But today finally by the grace of luck, god and sheer hardwork I got a 17 lpa job. I almost have tears in my eyes.

---

To every underdog, no matter how talented or bad luck you have seen people or if you are, do what you love, do with discipline, do with eager and put more than enough hardwork. **One day it will be your day.**

It’s an off campus one so it’s really means a lot to me and my family. I ain’t talented but I know I have put enough, kept my head down and felt every insult of relatives and parents.

Remember a line from my fav anime character (Toru Oikawa from Haikyu): *"Talent is something you make boom, instincts are something you polish"*

Hope everyone gets their dream too.

* **Edit 0:** I am fresher, 2025 passout, CSE
* **Edit:** For some reason my reddit is not allowing me to respond to comments. But thank you everyone
* **Edit 2:** I applied though referral in company portal.
`
    },
    {
        id: '1',
        title: 'second Post!',
        content: 'Hello'
    }
]
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
    }
})

export const postsReducer = postsSlice.reducer
//selectors
const selectPostId = (state: RootState, postId: string) => postId;

const selectPosts = (state: RootState) => state.posts;

export const makeSelectPostById = () => {
  return createSelector(
    [selectPosts, selectPostId],
    (posts, id) => {
      //console.log(`makeSelectPostById for ID ${id} is computing! (posts.find)`);
      return posts.find(post => post.id === id);
    }
  );
};

export const selectPostIds = createSelector(selectPosts, (posts) => {
    //console.log("selectPostIds is computing! (posts.map)")
    return posts.map(post => post.id)})