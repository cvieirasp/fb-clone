import firebase from './firebase'
import { PostType } from '../types/post'

const db = firebase.firestore()
const storage = firebase.storage()

export function getFirebase() {
  return firebase
}

export function getPostsCollection() {
  return db.collection('posts').orderBy('timestamp', 'desc')
}

export async function getPosts() {
  const posts = await db.collection('posts').orderBy('timestamp', 'desc').get()
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null
  }))
  return docs
}

export async function addPost(data: PostType) {
  db.collection('posts')
    .add({
      message: data.message,
      name: data.name,
      email: data.email,
      image: data.image,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((doc) => {
      if (data.postImage) {
        const uploadTaks = storage
          .ref(`posts/${doc.id}`)
          .putString(data.postImage, 'data_url')

        uploadTaks.on(
          'state_change',
          null,
          (err) => console.error(err),
          () => {
            storage
              .ref('posts')
              .child(doc.id)
              .getDownloadURL()
              .then((url) => {
                db.collection('posts').doc(doc.id).set(
                  {
                    postImage: url
                  },
                  { merge: true }
                )
              })
              .catch((err) => {
                console.error(err)
              })
          }
        )
      }
    })
    .catch((err) => {
      console.error(err)
    })
}
