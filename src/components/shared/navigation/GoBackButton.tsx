import {Button} from '@nextui-org/react';
import BackArrowIcon from '@/components/shared/icons/BackArrowIcon';

export function GoBackButton(props: { onPress: () => void }) {
  return <Button onPress={props.onPress}
                 startContent={<BackArrowIcon />}
                 color='primary'
                 className='mr-2'
                 size='sm'>
    Back
  </Button>;
}
