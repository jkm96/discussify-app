import {User} from '@/boundary/interfaces/user';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';

export function RedirectUserToDashboard(user: User | null, setLoading: any) {
  const router = useRouter();
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (user) {
        if (user.isAdmin) {
          router.push(NAVIGATION_LINKS.ADMIN_DASHBOARD);
        } else if (user.isSubscribed) {
          router.push(NAVIGATION_LINKS.HOME);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }, 500);

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [user, setLoading]);
}