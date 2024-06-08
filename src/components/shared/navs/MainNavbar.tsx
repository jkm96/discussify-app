'use client';

import React, {useState} from 'react';
import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from '@nextui-org/react';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import {useAuth} from '@/hooks/useAuth';
import {ThemeSwitcher} from "@/components/shared/navs/ThemeSwitcher";
import {UserResponse} from "@/boundary/interfaces/user";
import {useRouter} from "next/navigation";
import useClientMediaQuery from "@/hooks/useClientMediaQuery";

export default function MainNavbar() {
    const {user, loading} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const {matches: isMediumOrLarger} = useClientMediaQuery('(min-width: 768px)');

    return (
        <>
            <Navbar maxWidth="full" className='shadow-medium dark:bg-boxdark-mode' isMenuOpen={isMenuOpen}
                    onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className='sm:hidden'
                    />
                    <NavbarBrand>
                        <Link className='font-bold' href={NAVIGATION_LINKS.HOME}>
                            Discussify
                        </Link>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent as="div" justify='end'>
                    <ThemeSwitcher/>

                    {isMediumOrLarger && (
                        <NavbarItem>
                            <Link href={NAVIGATION_LINKS.FORUM_OVERVIEW}>
                                Forums
                            </Link>
                        </NavbarItem>
                    )}

                    {user && !loading && (
                        <>
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name="Jason Hughes"
                                        size="sm"
                                        src={user.profileUrl || ''}
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">{user.email}</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">My Settings</DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">Analytics</DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                                    <DropdownItem key="logout"
                                                  href={NAVIGATION_LINKS.LOGOUT}
                                                  color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </>
                    )}

                    {!user && !loading && (
                        <>
                            <NavbarItem>
                                <Link className='text-black-2 dark:text-white' href={NAVIGATION_LINKS.LOGIN}>
                                    Sign In
                                </Link>
                            </NavbarItem>
                            <NavbarItem>
                                <Link className='text-black-2' href={NAVIGATION_LINKS.REGISTER}>
                                    <Button size='sm' color='primary'>Get Started</Button>
                                </Link>
                            </NavbarItem>
                        </>
                    )}
                </NavbarContent>

                <NavbarMenu>
                    <NavbarMenuItem>
                        <Link className='w-full'
                              href={NAVIGATION_LINKS.HOME}
                              size='lg'
                        >
                            Home
                        </Link>

                        <Link className='w-full'
                              href={NAVIGATION_LINKS.FORUM_OVERVIEW}
                              size='lg'
                        >
                            Forums
                        </Link>
                    </NavbarMenuItem>
                </NavbarMenu>
            </Navbar>
        </>
    );
}
