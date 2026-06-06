import PropTypes from 'prop-types'
import { useState } from 'react'
import UpdateUserModal from '../../../components/Modal/UpdateUserModal'
import DeleteConfirmModal from '../../../components/Modal/DeleteConfirmModal'
import { useMutation } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'



const UserDataRow = ({ user, refetch }) => {
   
  const {user: loggedInUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const {mutateAsync} = useMutation({
        mutationFn: async role => {
            const {data} = await axiosSecure.patch(`/users/update/${user?.email}`,
                role
            )
            return data
        },
        onSuccess: data => {
            refetch()
            console.log(data)
            toast.success('User role updated successfully!')
            setIsOpen(false)
        }
    })

    const {mutateAsync: deleteMutateAsync} = useMutation({
        mutationFn: async email => {
            const {data} = await axiosSecure.delete(`/users/${email}`)
            return data
        },
        onSuccess: data => {
            refetch()
            console.log(data)
            toast.success('User deleted successfully!')
            setIsDeleteModalOpen(false)
        }
    })

    // modal handler
    const modalHandler = async (selected) => {
     if(loggedInUser.email === user.email) {
      toast.error('Action not allowed')
      return setIsOpen(false)
     }
        console.log('User role updated!', selected)
        const userRole = {
            role: selected,
            status: 'Verified',
        }

        try{
          await mutateAsync(userRole)
        }catch(err){
            console.log(err)
            toast.error(err.message)
        }
    }

    const deleteHandler = () => {
        if(loggedInUser.email === user.email) {
            return toast.error('Action not allowed')
        }
        setIsDeleteModalOpen(true)
    }

    const confirmDeleteHandler = async () => {
        try{
            await deleteMutateAsync(user.email)
        }catch(err){
            console.log(err)
            toast.error(err.message)
            setIsDeleteModalOpen(false)
        }
    }

  return (
    <tr>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.email}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{user?.role}</p>
      </td>
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        {user?.status ? (
          <p
            className={`${
              user.status === 'Verified' ? 'text-green-500' : 'text-yellow-500'
            } whitespace-no-wrap`}
          >
            {user.status}
          </p>
        ) : (
          <p className='text-red-500 whitespace-no-wrap'>Unavailable</p>
        )}
      </td>

      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <div className="flex items-center gap-2">
          <button
          onClick={() => setIsOpen(true)}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Update Role</span>
          </button>

          <button
          onClick={deleteHandler}
          className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight'>
            <span
              aria-hidden='true'
              className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
            ></span>
            <span className='relative'>Delete</span>
          </button>
        </div>
        {/* Update User Modal */}
        <UpdateUserModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHandler={modalHandler}
        user={user}
        ></UpdateUserModal>

        {/* Delete Confirm Modal */}
        <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        modalHandler={confirmDeleteHandler}
        email={user?.email}
        ></DeleteConfirmModal>
      </td>
    </tr>
  )
}

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
}

export default UserDataRow