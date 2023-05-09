import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IPost, IUser } from "../../models/models";

interface PostsState {
  loading: boolean,
  error: string,
  posts: IPost[],
  filteredPosts: IPost[]
}

interface FriendsPostsPayload {
  data: IPost[],
  friends: IUser[]
}

const initialState: PostsState ={
  loading: false,
  error: '',
  posts: [],
  filteredPosts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetchSuccess(state, action: PayloadAction<IPost[]>) {
      state.loading = false;
      state.posts = action.payload.reverse();
    },
    searchposts: (state, action: PayloadAction<FriendsPostsPayload>) => {
      const users = action.payload.friends.map(user => user._id);
      const filteredPosts = action.payload.data.filter((post) =>
        users.includes(post.owner)
      ).reverse();
      return {
        ...state,
        filteredPosts
      };
    },

    updateLikedSuccess(state, action: PayloadAction<IPost>) {
      state.loading = false;

      const itemToReplace = state.posts.findIndex(({_id}) => _id === action.payload._id);
      if (itemToReplace > -1) {
        state.posts[itemToReplace] = action.payload;
      }
    },

    fetchError(state, action: PayloadAction<Error>) {
      state.posts = [];
      state.filteredPosts = [];
      state.loading = false;
      state.error = action.payload.message;
    }
  }
})

export default postsSlice.reducer;
