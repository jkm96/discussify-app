import {Key} from 'react';
import {Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";

type SortDropdownProps = {
    selectedKey:string;
    onSelect: (key: string) => void;
};

export default function Filter({selectedKey,onSelect }: SortDropdownProps) {
    const handleDropdownSelection = (key: string) => {
        onSelect(key)
    };

    return (
        <Dropdown size='sm'>
            <DropdownTrigger>
                <Button size='sm' variant="bordered">
                    {selectedKey === 'oldest' ? 'Oldest First' : 'Latest First'}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Sort by:"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKey}
                onAction={(key: Key) => handleDropdownSelection(key as string)}
            >
                <DropdownItem key="oldest">Oldest First</DropdownItem>
                <DropdownItem key="latest">Latest First</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}
