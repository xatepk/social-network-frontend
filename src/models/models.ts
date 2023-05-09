export interface IAuth {
  password: string
  username: string
  email: string
}

export interface IUser {
  username: string
  _id: string
  avatar: string
  age: number
  university: string
  friends: string[]
  email: string
}

export interface IAuthResponse {
  token: string,
  user: {
    _id: string,
    avatar: string,
    username: string,
    age: number,
    university: string,
    friends: string[]
  }
}

export interface UpdateResponse {
  user: {
    _id: string,
    avatar: string,
    username: string,
    age: number,
    university: string
  }
}

export interface UpdateInfo {
  age: number,
  university: string
}

export interface User {
  _id: string,
  avatar: string,
  username: string,
  age: number,
  university: string
}

export interface IPost {
  date: string,
  _id: string,
  description: string,
  image: string,
  owner: string,
  likes: string[],
}

export interface PostData {
  owner: string,
  description: string,
  image: File,
}
