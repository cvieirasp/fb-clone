import Image from 'next/image'
import { signOut, useSession } from 'next-auth/client'
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon
} from '@heroicons/react/solid'
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline'
import HeaderIcon from './HeaderIcon'

function Header() {
  const [session] = useSession()

  return (
    <div className="flex items-center sticky top-0 z-50 p-2 lg:px-5 bg-white shadow-md">
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500 flex-shrink"
            type="text"
            placeholder="Pesquisar no Facebook"
          />
        </div>
      </div>

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      <div className="flex items-center sm:space-x-2 justify-end">
        <Image
          className="rounded-full cursor-pointer"
          src={session?.user?.image || ''}
          width="40"
          height="40"
          layout="fixed"
          onClick={() => signOut()}
        />
        <p className="hidden lg:inline-flex text-sm whitespace-nowrap font-semibold pr-3">
          {session?.user?.name}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        <ChevronDownIcon className="icon" />
      </div>
    </div>
  )
}

export default Header
