export type Users = {
  name: string
  username: string
  password: string
  id: string
}

export type Posts = {
  name: string
  post: string
  imgUrl: string
  id:string
  createdAt: any
}

export type Comment = {
  name: string
  comment: string
  imgUrl: string
  createdAt?: any
  id?: string
}

