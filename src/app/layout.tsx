import './globals.css';
import { UIProvider } from '@/context/uiProvider';
import { AuthProvider } from '@/context/authProvider';
import React from 'react';
import ToastContainerWrapper from "@/components/shared/notifications/ToastComponent";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang='en'>
      <body>
      <UIProvider>
        <AuthProvider>
          <ToastContainerWrapper />
          {children}
        </AuthProvider>
      </UIProvider>
      </body>
      </html>
  );
}
