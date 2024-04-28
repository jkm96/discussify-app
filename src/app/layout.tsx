import './globals.css';
import {UIProvider} from '@/context/uiProvider';
import {AuthProvider} from '@/context/authProvider';
import React from 'react';
import ToastContainerWrapper from "@/components/shared/notifications/ToastComponent";
import MainNavbar from "@/components/shared/navs/MainNavbar";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning={true} lang='en'>
        <body>
        <UIProvider>
            <AuthProvider>
                <ToastContainerWrapper/>
                <div className="w-full h-full dark:text-bodydark">
                    <MainNavbar/>
                    <div className="mx-auto w-11/12 px-4 sm:px-6">
                        {children}
                    </div>
                </div>
            </AuthProvider>
        </UIProvider>
        </body>
        </html>
    );
}
