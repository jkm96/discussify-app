import {useAuth} from '@/hooks/useAuth';
import {useRouter} from 'next/navigation';
import {deleteAccessToken} from '@/lib/services/token/tokenService';
import LogoutIcon from '@/components/shared/icons/LogoutIcon';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export default function LogoutForm() {
  const router = useRouter();
  const { clearAuthToken } = useAuth();
  const [status, setStatus] = useState<any>(null);

  async function handleLogout() {
    const response = await deleteAccessToken();
    if (response.statusCode === 200) {
      clearAuthToken();
      setStatus('deleted');
      toast.success('Logged out successfully.');
    }
  }

  useEffect(() => {
    if (status === 'deleted') {
      setTimeout(() => {
        router.push(NAVIGATION_LINKS.LOGIN);
      }, 5000);
    }
  }, [status]);

  return (
    <>
      <button
        type={'submit'} onClick={handleLogout} color='primary'
        className='flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'>
        <LogoutIcon />
        Log Out
      </button>
    </>
  );
}