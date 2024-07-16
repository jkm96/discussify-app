import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import SidebarOpenIcon from '@/components/shared/icons/SidebarOpenIcon';
import DashboardIcon from '@/components/shared/icons/DashboardIcon';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import {useAuth} from '@/hooks/useAuth';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
    const pathname = usePathname();
    const {user} = useAuth();

    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);

    let storedSidebarExpanded = 'true';
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === 'true',
    );

    // close on click outside
    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
        if (sidebarExpanded) {
            document.querySelector('body')?.classList.add('sidebar-expanded');
        } else {
            document.querySelector('body')?.classList.remove('sidebar-expanded');
        }
    }, [sidebarExpanded]);

    return (
        <aside
            ref={sidebar}
            className={`absolute flex flex-col overflow-y-hidden duration-300 ease-linear lg:static lg:translate-x-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className='flex items-center gap-2 px-6 mb-0 py-2 lg:py-4'>
                <button
                    ref={trigger}
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    aria-controls='sidebar'
                    aria-expanded={sidebarOpen}
                    className='block lg:hidden'>
                    <SidebarOpenIcon/>
                </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
                {/* <!-- Sidebar Menu --> */}
                <nav className=' py-2 px-2 lg:px-4'>
                    {/* <!-- Menu Group --> */}
                    {user?.isAdmin && (
                        <>
                            <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>
                                MENU
                            </h3>

                            <ul className='mb-6 flex flex-col gap-4'>

                                <li>
                                    <Link
                                        href={NAVIGATION_LINKS.ADMIN_DASHBOARD}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                             duration-300 ease-in-out hover:text-yellow-500 ${
                                            pathname === NAVIGATION_LINKS.ADMIN_DASHBOARD && 'dark:text-white text-yellow-400 font-bold'
                                        } `}>
                                        <DashboardIcon/>
                                        Dashboard
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={NAVIGATION_LINKS.ADMIN_MANAGE_USERS}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            duration-300 ease-in-out hover:text-yellow-500 ${
                                            pathname === NAVIGATION_LINKS.ADMIN_MANAGE_USERS && 'dark:text-white text-yellow-400 font-bold'
                                        } `}>
                                        <DashboardIcon/>
                                        Users
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            duration-300 ease-in-out hover:text-yellow-500 ${
                                            pathname === NAVIGATION_LINKS.ADMIN_MANAGE_SITE_CONTENT && 'dark:text-white text-yellow-400 font-bold'
                                        } `}>
                                        <DashboardIcon/>
                                        Site Content
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href={NAVIGATION_LINKS.ADMIN_MANAGE_CUSTOMER_FEEDBACK}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium 
                                                            duration-300 ease-in-out hover:text-yellow-500 ${
                                            pathname === NAVIGATION_LINKS.ADMIN_MANAGE_CUSTOMER_FEEDBACK && 'dark:text-white text-yellow-400 font-bold'
                                        } `}>
                                        <DashboardIcon/>
                                        Feedback
                                    </Link>
                                </li>
                            </ul>
                        </>
                    )}
                </nav>
                {/* <!-- Sidebar Menu --> */}
            </div>
        </aside>
    );
};

export default Sidebar;
