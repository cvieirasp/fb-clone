import { MouseEvent } from 'react'
import { useSession } from 'next-auth/client'
import Image from 'next/image'
import { EmojiHappyIcon } from '@heroicons/react/outline'
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid'

function InputBox() {
  const [session] = useSession()

  const sendPost = (e: MouseEvent) => {
    e.preventDefault()
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
            placeholder={`O que você está pensando, ${session?.user?.name}`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Enviar
          </button>
        </form>
      </div>

      <div className="flex justify-evenly p-3 border-t">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Vídeo ao Vivo</p>
        </div>
        <div className="inputIcon">
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:text-base">Foto/Vídeo</p>
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
