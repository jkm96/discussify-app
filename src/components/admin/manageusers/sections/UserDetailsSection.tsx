import {UserResponse} from '@/boundary/interfaces/user';
import {Input} from '@nextui-org/react';
import {formatDateWithTime} from '@/helpers/dateHelpers';

export function UserDetailsSection({ userDetails }: { userDetails: UserResponse }) {
  return (
    <section className='overflow-hidden'>
      <div className='px-4 py-5 sm:px-6 justify-items-center text-center'>
        <h3 className='text-lg leading-6 font-medium text-gray-900'>
          {userDetails.username}
        </h3>
        <p className='mt-1 text-sm text-center text-gray-500'>
          This is some information about the user.
        </p>
      </div>

      <div className='border-t border-gray-200 px-4 py-5 sm:p-0'>
        <div className='flex flex-col gap-4'>
          <div className='flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='text'
              label='Email Address'
              readOnly={true}
              value={userDetails.email}
              labelPlacement={'outside'}
            />

            <Input
              type='text'
              label='Active Status'
              readOnly={true}
              value={userDetails.isActive ? 'Active' : 'Inactive'}
              labelPlacement={'outside'}
            />

            <Input
              type='text'
              label='Subscription Status'
              readOnly={true}
              value={userDetails.isSubscribed ? 'Subscribed' : 'UnSubscribed'}
              labelPlacement={'outside'}
            />
          </div>

          <div className='flex w-full flex-wrap items-end md:flex-nowrap mb-6 md:mb-0 gap-4'>
            <Input
              type='text'
              label='isEmailVerified'
              readOnly={true}
              value={userDetails.isEmailVerified ? 'Email Verified' : 'Email UnVerified'}
              labelPlacement={'outside'}
            />

            <Input
              type='text'
              label='Email VerifiedAt'
              readOnly={true}
              value={userDetails.emailVerifiedAt != '' ? formatDateWithTime(userDetails.emailVerifiedAt) : ''}
              labelPlacement={'outside'}
            />

            <Input
              type='text'
              label='Created At'
              readOnly={true}
              value={formatDateWithTime(userDetails.createdAt)}
              labelPlacement={'outside'}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
