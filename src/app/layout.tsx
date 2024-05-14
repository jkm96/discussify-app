import './globals.css';
import {UIProvider} from '@/context/uiProvider';
import {AuthProvider} from '@/context/authProvider';
import React from 'react';
import ToastContainerWrapper from "@/components/shared/notifications/ToastComponent";
import MainNavbar from "@/components/shared/navs/MainNavbar";
import {Footer} from "@/components/shared/navs/Footer";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning={true} lang='en'>
        <body>
        <UIProvider>
            <AuthProvider>
                <ToastContainerWrapper/>
                <div className="w-full h-full dark:text-bodydark">
                    <MainNavbar/>
                    <div className="mx-auto md:px-4">
                        {children}
                    </div>
                    {/*<Footer/>*/}
                </div>
            </AuthProvider>
        </UIProvider>
        </body>
        </html>
    );
}
