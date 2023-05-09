import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { IUser } from "../../models/models";

interface AuthState {
  loading: boolean,
  error: string,
  isAuthenticated: boolean
  access: string
  username: string
  id: string
  avatar: string
  age: number
  university: string
  friends: IUser[]
  recommend: IUser[]
  userData: IUser | null
}

const ACCESS_KEY = 'dc-access'
const USERNAME_KEY = 'dc-username'
const EXPIRES_KEY = 'dc-expires'
const USERID_KEY = 'ds-userid'

function getInitialState(): AuthState {
  const expiresIn = localStorage.getItem(EXPIRES_KEY) ?? null

  if (expiresIn && new Date() > new Date(expiresIn)) {
    return {
      loading: false,
      error: '',
      isAuthenticated: false,
      access: '',
      username: '',
      id: '',
      avatar: '',
      age: 0,
      university: '',
      friends: [],
      recommend: [],
      userData: null
    }
  }

  return {
    isAuthenticated: Boolean(localStorage.getItem(ACCESS_KEY) ?? ''),
    access: localStorage.getItem(ACCESS_KEY) ?? '',
    username: localStorage.getItem(USERNAME_KEY) ?? '',
    id: localStorage.getItem(USERID_KEY) ?? '',
    avatar: '',
    age: 0,
    university: '',
    loading: false,
    error: '',
    friends: [],
    recommend: [],
    userData: null
  }
}

const initialState: AuthState = getInitialState()

interface AuthPayload {
  access: string
  username: string
  id: string
  avatar: string
  age: number
  university: string
}

interface AvatarPayload {
  avatar: string
}

interface InfoPayload {
  age: number
  university: string
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    fetcSuccess(state) {
      state.loading = false;
    },
    logout(state) {
      state.isAuthenticated = false
      state.access = ''
      state.username = ''
      state.id = ''
      state.avatar = ''
      state.age = 0
      state.university = ''
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(USERNAME_KEY)
      localStorage.removeItem(EXPIRES_KEY)
      localStorage.removeItem(USERID_KEY)
    },
    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.loading = false;
      state.access = action.payload.access
      state.username = action.payload.username
      state.id = action.payload.id
      state.isAuthenticated = Boolean(action.payload.access)
      state.avatar = action.payload.avatar
      state.age = action.payload.age
      state.university = action.payload.university

      const tokenExpires = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

      localStorage.setItem(ACCESS_KEY, action.payload.access)
      localStorage.setItem(USERNAME_KEY, action.payload.username)
      localStorage.setItem(EXPIRES_KEY, tokenExpires.toString())
      localStorage.setItem(USERID_KEY, action.payload.id)
    },
    updateAvatar(state, action: PayloadAction<AvatarPayload>) {
      state.avatar = action.payload.avatar;
    },
    reccomendedFriends(state, action: PayloadAction<IUser[]>) {
      state.recommend = action.payload.filter((user) =>
        !user.friends.includes(state.id) && user._id !== state.id
      );
      state.friends = action.payload.filter((user) =>
        user.friends.includes(state.id)
      )
    },
    userData(state, action: PayloadAction<IUser>) {
      state.userData = action.payload;
    },
    updateInfo(state, action: PayloadAction<InfoPayload>) {
      state.age = action.payload.age;
      state.university = action.payload.university
    },
  }
})

export default authSlice.reducer
