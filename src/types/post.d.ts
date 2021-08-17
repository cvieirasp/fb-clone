import { Timestamp } from 'firebase/firestore'

interface PostType {
  id: string
  name: string
  email: string
  message: string
  postImage?: string
  image: string
  timestamp?: Timestamp | null
}

interface PostTypeList {
  posts: PostType[]
}

export { PostType, PostTypeList }
