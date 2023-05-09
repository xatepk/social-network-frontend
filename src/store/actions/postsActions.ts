import { AppDispatch } from "../index";
import axios from "../../axios"
import { postsSlice } from "../slices/postsSlice";
import { IPost, IUser, PostData } from "../../models/models";

export const fetchPosts = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.fetching());
      const response = await axios.get<IPost[]>('posts');
      dispatch(postsSlice.actions.fetchSuccess(response.data));

    } catch (err) {
      dispatch(postsSlice.actions.fetchError(err as Error));
    }
  }
}

export const fetchOwnerPosts = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.fetching());
      const response = await axios.get<IPost[]>(`posts/${id}`);
      dispatch(postsSlice.actions.fetchSuccess(response.data));

    } catch (err) {
      dispatch(postsSlice.actions.fetchError(err as Error));
    }
  }
}

export const deletePost = (id:string, token:string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.fetching());
      const response = await axios.delete<IPost[]>(`posts/${id}`, config);
      dispatch(postsSlice.actions.fetchSuccess(response.data));

    } catch (err) {
      dispatch(postsSlice.actions.fetchError(err as Error));
    }
  }
}

export const createPost = (post: PostData) => {
  let formData: any;
  if (post.image !== null) {
    formData = new FormData();
    formData.append('file', post.image);
  } else {
    formData = post;
  }

  return async (dispatch: AppDispatch) => {
    try {
      await axios.post(`/posts/${post.owner}/${post.description}`, formData);
    } catch (err) {
      dispatch(postsSlice.actions.fetchError(err as Error));
    }
  }
}

export const fetchLikePost = (id:string, token:string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.fetching());
      const response = await axios.patch<IPost>(`/posts/${id}/likes`,{}, config);
      dispatch(postsSlice.actions.updateLikedSuccess(response.data));
    } catch (err) {
      dispatch(postsSlice.actions.fetchError(err as Error));
    }
  }
}

export const fetchFriendsPosts = (friends:IUser[]) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(postsSlice.actions.fetching());
      const { data } = await axios.get<IPost[]>('posts');
      dispatch(postsSlice.actions.searchposts({data, friends}));

    } catch (err) {
      dispatch(postsSlice.actions.fetchError(err as Error));
    }
  }
}
