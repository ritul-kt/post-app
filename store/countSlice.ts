import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { postDatas, weekdays } from '@/postData';

interface Post {
  posted_on: string;
}

interface PostsState {
  postsPerWeekday: Record<string, number>;
}

const calculateInitialPostsPerWeekday = (): Record<string, number> => {
  const postCountByWeekday: Record<string, number> = {
    Sun: 0,
    Mon: 0,
    Tue: 0,
    Wed: 0,
    Thu: 0,
    Fri: 0,
    Sat: 0,
  };

  postDatas.forEach((post: Post) => {
    const date = new Date(post.posted_on);
    const weekday = weekdays[date.getDay()];
    postCountByWeekday[weekday]++;
  });

  return postCountByWeekday;
};

const initialState: PostsState = {
  postsPerWeekday: calculateInitialPostsPerWeekday(),
};

const countSlice = createSlice({
  name: 'counts',
  initialState,
  reducers: {
    addCount: (state, action: PayloadAction<Post>) => {
      const { posted_on } = action.payload;
      const date = new Date(posted_on);
      const weekday = weekdays[date.getDay()];
      state.postsPerWeekday[weekday]++;
    },
    deleteCount:(state,action:PayloadAction<Post>)=>{
        const { posted_on } = action.payload;
        const date = new Date(posted_on);
        const weekday = weekdays[date.getDay()];
        state.postsPerWeekday[weekday]--;
    },
  },
});

export const { addCount,deleteCount } = countSlice.actions;
export default countSlice.reducer;
