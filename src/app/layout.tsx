import './globals.css';
import {UIProvider} from '@/context/uiProvider';
import {AuthProvider} from '@/context/authProvider';
import React from 'react';
import ToastContainerWrapper from "@/components/shared/notifications/ToastComponent";
import MainNavbar from "@/components/shared/navs/MainNavbar";

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang='en'>
        <body>
        <UIProvider>
            <AuthProvider>
                <ToastContainerWrapper/>
                <MainNavbar/>
                <main className="mx-auto w-11/12 px-4 sm:px-6">
                    {children}
                </main>
            </AuthProvider>
        </UIProvider>
        </body>
        </html>
    );
}
