'use client';

import { NextUIProvider } from '@nextui-org/react';
import React from 'react';
import {ThemeProvider as NextThemesProvider} from "next-themes";

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}