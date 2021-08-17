import firebase from 'firebase'
import { useCollection } from 'react-firebase-hooks/firestore'

interface Props {
  documents:
    | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
    | undefined
  isLoading: boolean
  error: firebase.FirebaseError | undefined
}

function useDocumentDataSSR(
  ref: firebase.firestore.Query<firebase.firestore.DocumentData>
): Props {
  const [documents, isLoading, error] = useCollection(ref)

  const result = {
    documents: documents,
    isLoading: isLoading,
    error: error
  }

  return result
}

export default useDocumentDataSSR
