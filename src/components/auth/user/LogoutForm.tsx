'use client';

import {useAuth} from '@/hooks/useAuth';
import {useRouter} from 'next/navigation';
import {deleteAccessToken} from '@/lib/services/token/tokenService';
import {NAVIGATION_LINKS} from '@/boundary/configs/navigationConfig';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {CircularProgress} from "@nextui-org/react";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function LogoutForm() {
    const router = useRouter();
    const {clearAuthToken} = useAuth();
    const [user, setUser] = useLocalStorage('user', null);
    const [status, setStatus] = useState<any>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    async function handleLogout() {
        const response = await deleteAccessToken();
        if (response.statusCode === 200) {
            setIsLoggingOut(false)
            clearAuthToken();
            setUser(null)
            setStatus('deleted');
            toast.success('Logged out successfully.');
        }
    }

    useEffect(() => {
        handleLogout()
    }, []);

    useEffect(() => {
        if (status === 'deleted') {
            setTimeout(() => {
                router.push(NAVIGATION_LINKS.LOGIN);
            }, 5000);
        }
    }, [status]);

    return (
        <div className='grid place-items-center items-center'>
            {isLoggingOut ?
                (
                    <CircularProgress color='primary' className='p-4' label='Logging you out...'/>
                )
                :
                (
                    <div className='grid place-items-center'>
                        You have been logged out successfully
                    </div>
                )}
        </div>
    );
}