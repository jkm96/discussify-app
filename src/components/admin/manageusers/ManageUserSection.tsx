import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';
import {CircularProgress} from '@nextui-org/react';
import {Button} from '@nextui-org/button';
import {EditIcon} from '@nextui-org/shared-icons';
import {UserResponse} from '@/boundary/interfaces/user';
import ToggleUserStatusModal from '@/components/admin/manageusers/modals/ToggleUserStatusModal';
import {getUserById} from '@/lib/services/admin/manageUserService';
import {CreateUserSubscriptionRequest} from '@/boundary/interfaces/admin';
import {UserDetailsSection} from '@/components/admin/manageusers/sections/UserDetailsSection';

export default function ManageUserSection({ userId }: { userId: number }) {
  const [userDetails, setUserDetails] = useState<UserResponse>({} as UserResponse);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);
  const [modals, setModals] = useState({
    toggleUser: false,
    toggleSubscription: false,
    createSubscription: false,
  });

  const openModal = (modalName: string) => {
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName: string) => {
    setModals({ ...modals, [modalName]: false });
    fetchUserDetails(userId);
  };

  const fetchUserDetails = async (userId: any) => {
    setIsLoadingDetails(true);
    await getUserById(userId)
      .then((response) => {
        if (response.statusCode === 200) {
          const user: UserResponse = response.data;
          setUserDetails(user);
        } else {
          toast.error(`Error fetching user details: ${response.message}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        toast.error(`Error fetching user details: ${error}`);
      })
      .finally(() => {
        setIsLoadingDetails(false);
      });
  };

  useEffect(() => {
    fetchUserDetails(userId);
  }, [userId]);

  const createRequest: CreateUserSubscriptionRequest = {
    customerEmail: userDetails.email,
    customerId: '',
  };

  return (
    <>
      {isLoadingDetails ? (
        <div className='flex items-center justify-center'>
          <CircularProgress color='primary' className='p-4'
                            label='Loading user details...' />
        </div>
      ) : (
        <>
          <div className='flex flex-col gap-4 m-2'>
            <div className='flex justify-between gap-3 items-end'>
              <div className='w-full sm:max-w-[44%]'>
                <div className='relative flex flex-1 flex-shrink-0'>
                  <Button onPress={() => openModal('toggleUser')}
                          startContent={<EditIcon />}
                          color={userDetails.isActive ? 'danger' : 'success'}
                          className='mr-2'
                          size='sm'
                          variant='shadow'>
                    {userDetails.isActive ? 'Deactivate' : 'Activate'}
                  </Button>

                  {modals.toggleUser && (
                    <ToggleUserStatusModal
                      userId={userId}
                      currentStatus={userDetails.isActive ? 'Deactivate' : 'Activate'}
                      isOpen={modals.toggleUser}
                      onClose={() => closeModal('toggleUser')}
                    />
                  )}

                </div>
              </div>
            </div>
          </div>

          <UserDetailsSection userDetails={userDetails} />
          
        </>
      )}
    </>
  );
}