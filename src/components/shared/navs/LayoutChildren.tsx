'use client';

import React from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import {User} from "@/boundary/interfaces/user";

export function LayoutChildren(props: { children: React.ReactNode }) {
    const [user, setUser] = useLocalStorage<User | null>('user', null);
    console.info('user-login',user?.isAdmin)
    return (
       <>
           {user === undefined ? (
               <div className='mx-auto md:px-4'>
                   {props.children}
               </div>
           ) : (
               <div className={`mx-auto ${user?.isAdmin ? '' : 'md:px-4'}`}>
                   {props.children}
               </div>
           )}
       </>
    );
}