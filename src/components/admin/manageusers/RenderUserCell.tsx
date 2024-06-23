import {UserResponse} from '@/boundary/interfaces/user';
import {Chip, User} from '@nextui-org/react';
import Link from 'next/link';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';

export default function RenderUserCell(user: UserResponse, columnKey: string | number | bigint, statusColorMap: Record<string, 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | undefined>) {
  // @ts-ignore
  const cellValue = user[columnKey];
  switch (columnKey) {
    case 'createdAt':
      return (
        <div className='flex flex-col'>
          <p className='text-bold text-small capitalize'>{cellValue}</p>
        </div>
      );
    case 'username':
      return (
        <Link href={`${NAVIGATION_LINKS.ADMIN_MANAGE_USERS}/${user.id}`}>
          <User
            className='text-bold text-small capitalize'
            name={user.username}
          />
        </Link>
      );
    case 'isActive':
      return (
        <Chip className='capitalize' color={statusColorMap[user.isActive ? 'active' : 'inactive']} size='sm'
              variant='flat'>
          {user.isActive ? 'active' : 'inactive'}
        </Chip>
      );
    case 'isEmailVerified':
      return (
        <Chip className='capitalize' color={statusColorMap[user.isEmailVerified ? 'verified' : 'unverified']}
              size='sm' variant='flat'>
          {user.isEmailVerified ? 'verified' : 'unverified'}
        </Chip>
      );
    case 'isSubscribed':
      return (
        <Chip className='capitalize' color={statusColorMap[user.isSubscribed ? 'yes' : 'no']} size='sm'
              variant='flat'>
          {user.isSubscribed ? 'yes' : 'no'}
        </Chip>
      );
    case 'actions':
      return (
        <div className='relative flex justify-center items-center gap-2'>
          <Link href={`${NAVIGATION_LINKS.ADMIN_MANAGE_USERS}/${user.id}`}>
            <Chip color='success'>View</Chip>
          </Link>
        </div>
      );
    default:
      return <Link href={`${NAVIGATION_LINKS.ADMIN_MANAGE_USERS}/${user.id}`}>{cellValue}</Link>;
  }
}
