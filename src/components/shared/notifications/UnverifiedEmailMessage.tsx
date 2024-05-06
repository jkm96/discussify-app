import {useAuth} from '@/hooks/useAuth';
import {useEffect, useState} from 'react';
import {User} from '@/boundary/interfaces/user';

export default function UnverifiedEmailMessage() {
  const { user, loading: authLoading } = useAuth();
  const [userInfo, setUserInfo] = useState({} as User);

  useEffect(() => {
    if (user) {
      setUserInfo(user);
    }
  }, [user]);

  return (
    <>
      {authLoading ? (<></>) : (
        <>
          {userInfo && userInfo.isEmailVerified ? (
            <></>
          ) : (
            <>
              {!userInfo.isAdmin && userInfo.gracePeriodCount > 0 &&(
                <div
                  className='w-full grid p-2 place-items-center bg-yellow-100 dark:bg-boxdark dark:border-1 dark:border-gray'>
                  <div
                    className='flex items-center text-sm text-black-2 dark:text-yellow-400' role='alert'>
                    <svg className='flex-shrink-0 inline w-4 h-4 me-3' aria-hidden='true'
                         xmlns='http://www.w3.org/2000/svg'
                         fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1
                        1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                    </svg>
                    <span className='sr-only'>Info</span>
                    <div>
                      <span className='font-medium'>Email Verification Alert!</span> You
                      have {userInfo.gracePeriodCount} days
                      to verify your email to continue accessing this resource.
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}