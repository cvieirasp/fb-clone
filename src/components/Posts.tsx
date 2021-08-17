import Post from './Post'
import { PostTypeList } from '../types/post'
import { getPostsCollection } from '../lib/db'
import useDocumentDataSSR from '../hooks/customHook'

function Posts({ posts }: PostTypeList) {
  const realtimePosts = useDocumentDataSSR(getPostsCollection())

  return (
    <div>
      {!realtimePosts.isLoading && realtimePosts.documents
        ? realtimePosts.documents?.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />
          ))}
    </div>
  )
}

export default Posts
