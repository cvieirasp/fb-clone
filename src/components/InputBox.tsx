import { ChangeEvent, MouseEvent, useRef, useState } from 'react'
import { useSession } from 'next-auth/client'
import Image from 'next/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { addPost } from '../lib/db'

function InputBox() {
  const [session] = useSession()
  const [imageToPost, setImageToPost] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const filePickerRef = useRef<HTMLInputElement>(null)

  const sendPost = (e: MouseEvent) => {
    e.preventDefault()

    if (!inputRef.current?.value) return

    addPost({
      id: '',
      message: inputRef.current.value,
      name: session?.user?.name || '',
      email: session?.user?.email || '',
      image: session?.user?.image || '',
      postImage: imageToPost
    })
    /*db.collection('posts')
      .add({
        message: inputRef.current.value,
        name: session?.user?.name,
        email: session?.user?.email,
        image: session?.user?.image,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((doc) => {
        if (imageToPost) {
          const uploadTaks = storage
            .ref(`posts/${doc.id}`)
            .putString(imageToPost, 'data_url')

          removeImage()

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
      })*/

    removeImage()
    inputRef.current.value = ''
  }

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (e.target.files?.length) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      const result = `${readerEvent.target?.result || ''}`
      setImageToPost(result)
    }
  }

  const removeImage = () => {
    setImageToPost('')
    if (filePickerRef.current) filePickerRef.current.value = ''
  }

  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session?.user?.image || ''}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-22 bg-gray-100 flex-grow px-5 py-2 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={`O que você está pensando, ${session?.user?.name}`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Enviar
          </button>
        </form>

        {imageToPost && (
          <div
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
            onClick={removeImage}
          >
            <img
              className="h-10 object-contain"
              src={imageToPost}
              alt="Imagem Selecionada"
            />
            <p className="text-xs text-red-500 text-center">Remover</p>
          </div>
        )}
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Vídeo ao Vivo</p>
        </div>
        <div
          className="inputIcon"
          onClick={() => filePickerRef.current?.click()}
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Foto/Vídeo</p>
          <input
            hidden
            type="file"
            ref={filePickerRef}
            onChange={addImageToPost}
          />
        </div>
        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">
            Sentimento/Atividade
          </p>
        </div>
      </div>
    </div>
  )
}

export default InputBox
