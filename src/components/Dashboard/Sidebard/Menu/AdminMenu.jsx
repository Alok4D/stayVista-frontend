import { FaUserCog } from 'react-icons/fa'
import { MdMarkEmailUnread } from 'react-icons/md'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={MdMarkEmailUnread} label='Contact Messages' address='contact-messages' />
    </>
  )
}

export default AdminMenu