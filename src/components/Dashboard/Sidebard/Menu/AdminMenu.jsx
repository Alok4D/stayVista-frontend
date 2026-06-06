import { FaUserCog } from 'react-icons/fa'
import { MdMarkEmailUnread, MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import { BsFillHouseAddFill } from 'react-icons/bs'
import MenuItem from './MenuItem'

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='Manage Users' address='manage-users' />
      <MenuItem icon={MdMarkEmailUnread} label='Contact Messages' address='contact-messages' />
      <MenuItem icon={BsFillHouseAddFill} label='Add Room' address='add-room' />
      <MenuItem icon={MdHomeWork} label='My Listings' address='my-listings' />
      <MenuItem icon={MdOutlineManageHistory} label='Manage Bookings' address='manage-bookings' />
    </>
  )
}

export default AdminMenu