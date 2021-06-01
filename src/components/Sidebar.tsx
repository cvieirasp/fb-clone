import { useSession } from 'next-auth/client'
import {
  ChevronDownIcon,
  ShoppingBagIcon,
  UserGroupIcon
} from '@heroicons/react/outline'
import {
  CalendarIcon,
  ClockIcon,
  DesktopComputerIcon,
  UsersIcon
} from '@heroicons/react/solid'
import SidebarRow from './SidebarRow'

function Sidebar() {
  const [session, loading] = useSession()

  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      <SidebarRow src={session?.user?.image} title={session?.user?.name} />
      <SidebarRow Icon={UsersIcon} title="Amigos" />
      <SidebarRow Icon={UserGroupIcon} title="Grupos" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Assista" />
      <SidebarRow Icon={CalendarIcon} title="Eventos" />
      <SidebarRow Icon={ClockIcon} title="Memórias" />
      <SidebarRow Icon={ChevronDownIcon} title="Veja mais" />
    </div>
  )
}

export default Sidebar
