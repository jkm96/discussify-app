'use client';

import React from 'react';
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { NAVIGATION_LINKS } from '@/boundary/configs/navigationConfig';
import { useAuth } from '@/hooks/useAuth';

export default function MainNavbar() {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: 'Home', id: 'home' },
    { label: 'Features', id: 'features' },
    { label: 'Pricing', id: 'pricing' },
  ];

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close the menu when a menu item is clicked
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className='sm:hidden'
        />
        <NavbarBrand>
          <Link className='font-bold' href={NAVIGATION_LINKS.HOME}>
            Pet Diaries
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {user ? (
        <></>
      ) : (
        <>
          <NavbarContent className='hidden sm:flex gap-4' justify='center'>
            {menuItems.map((item, index) => (
              <NavbarItem key={item.id}>
                <Link color='foreground' href={`#${item.id}`} onPress={handleMenuItemClick}>
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
          <NavbarContent justify='end'>
            <NavbarItem>
              <Link className='text-black-2' href={NAVIGATION_LINKS.LOGIN}>Sign In</Link>
            </NavbarItem>
            <NavbarItem>
              <Link className='text-black-2' href={NAVIGATION_LINKS.REGISTER}>
                <Button size='sm' color='primary'>Get Started</Button>
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.label}-${index}`}>
                <Link
                  color={
                    index === 2 ? 'primary' : index === menuItems.length - 1 ? 'danger' : 'foreground'
                  }
                  className='w-full'
                  href={`#${item.id}`}
                  size='lg'
                  onPress={handleMenuItemClick}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </>
      )}
    </Navbar>
  );
}
