import React from 'react';
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ChevronDownIcon } from '@/components/shared/icons/ChevronDownIcon';
import { capitalize } from '@/lib/utils/tableUtils';


export function TableVisibleColumns({ visibleColumns, setVisibleColumns, tableColumns }: any) {
  return (
    <Dropdown>
      <DropdownTrigger className='hidden sm:flex'>
        <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat'>
          Columns
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label='Table Columns'
        closeOnSelect={false}
        selectedKeys={visibleColumns}
        selectionMode='multiple'
        onSelectionChange={setVisibleColumns}
      >
        {tableColumns.map((column: any) => (
          <DropdownItem key={column.uid} className='capitalize'>
            {capitalize(column.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
