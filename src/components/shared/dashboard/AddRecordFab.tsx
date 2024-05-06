import {Button} from '@nextui-org/button';
import React from 'react';
import {PlusIcon} from '@/components/shared/icons/PlusIcon';

export function AddRecordFab(props: { onClick: (e: any) => void }) {
  return <div className='fixed bottom-4 right-4 md:hidden'>
    <Button onClick={props.onClick}
            isIconOnly
            color='primary'
            radius='full'
            variant='shadow'>
      <PlusIcon color={'#fff'} />
    </Button>
  </div>;
}