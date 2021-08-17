import React from 'react'
import firebase from 'firebase'

interface Props {
  id: string
  value: firebase.firestore.DocumentData
}

export const useGetData = () => {
  const [documents, setDocuments] = React.useState<Props[]>([])
  const db = firebase.firestore()
  React.useEffect(() => {
    db.collection('posts')
      .get()
      .then((querySnapshot) => {
        const arr: Props[] = []
        querySnapshot.docs.map((doc) =>
          arr.push({ id: doc.id, value: doc.data() })
        )
        setDocuments(arr)
      })
  }, [db])
  return [documents]
}
