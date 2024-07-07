

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PostData, postDatas } from '@/postData';


interface PostState {
    posts: PostData[];
  }
  
const initialState: PostState = {
    posts: postDatas,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action:PayloadAction<string>) => {
        const newPost ={
            text:action.payload,
            posted_on:new Date().toDateString(),
            id: state.posts.length ? state.posts[state.posts.length - 1].id + 1 : 1,
        }
      state.posts.push(newPost);
    },
    deletePost: (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      },
  },
});


export const { addPost,deletePost } = postSlice.actions;
export default postSlice.reducer;
