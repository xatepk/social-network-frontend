import { AppDispatch } from ".."
import axios from "../../axios"
import { IAuth, IAuthResponse, IUser, UpdateInfo, UpdateResponse } from "../../models/models"
import { authSlice } from "../slices/authSlice"

export const register = (params: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.fetching());
      const {
        data: {
          user: {
            username,
            _id: id,
            avatar,
            age,
            university
          },
          token: access,
        },
      } = await axios.post<IAuthResponse>(`signup`, params);

      dispatch(authSlice.actions.loginSuccess({
        access,
        username,
        id,
        avatar,
        age,
        university
      }))
    } catch (e) {
      console.log('Error register', e)
    }
  }
}

export const autorization = (params: IAuth) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.fetching());
      const {
        data: {
          user: {
            username,
            _id: id,
            avatar,
            age,
            university
          },
          token: access,
        },
      } = await axios.post<IAuthResponse>(`signin`, params);

      dispatch(authSlice.actions.loginSuccess({
        access,
        username,
        id,
        avatar,
        age,
        university
      }))
    } catch (e) {
      console.log('Error Login', e)
    }
  }
}

export const getUserData = (token: string) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.fetching());
      const {
        data: {
          user: {
            username,
            _id: id,
            avatar,
            age,
            university
          },
          token: access,
        },
      } = await axios.get<IAuthResponse>(`/user`, config);

      dispatch(authSlice.actions.loginSuccess({
        access,
        username,
        id,
        avatar,
        age,
        university
      }))
    } catch (e) {
      console.log('Error Login', e)
    }
  }
}

export const uploadAvatar = (params: File, token:string) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return async (dispatch: AppDispatch) => {
    try {
      const formData = new FormData()
      formData.append('file', params);

      const {
        data: {
          user: {
            avatar,
          },
        },
      } = await axios.patch<UpdateResponse>(`/users/avatar`, formData, config);


      dispatch(authSlice.actions.updateAvatar({
        avatar
      }));

    } catch (e) {
      console.log('Error Upload Avatar', e)
    }
  }
}

export const uploadData = (params: UpdateInfo, token:string) => {

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return async (dispatch: AppDispatch) => {
    try {
      const {
        data: {
          user: {
            age,
            university
          },
        },
      } = await axios.patch<UpdateResponse>(`/users/me`, params, config);


      dispatch(authSlice.actions.updateInfo({
        age,
        university
      }));

    } catch (e) {
      console.log('Error Upload Avatar', e)
    }
  }
}

export const getUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.fetching());
      const { data } = await axios.get<IUser[]>('users');

      dispatch(authSlice.actions.reccomendedFriends(data));
    } catch (e) {
      console.log('Error Login', e)
    }
  }
}

export const fetchAddFriend = (id:string, token:string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.fetching());
      const { data } = await axios.patch<IUser[]>(`/users/${id}/friends`, {}, config);
      dispatch(authSlice.actions.reccomendedFriends(data));
    } catch (err) {
      console.log('Error', err)
    }
  }
}

export const getUserDataById = (id: string) => {

  return async (dispatch: AppDispatch) => {
    try {
      dispatch(authSlice.actions.fetching());
      const { data } = await axios.get<IUser>(`/users/${id}`);

      await dispatch(authSlice.actions.userData(data));
      dispatch(authSlice.actions.fetcSuccess());
    } catch (e) {
      console.log('Error', e)
    }
  }
}
