/**
 * Provides a theme provider component that wraps the application and allows for theme switching.
 * This component uses the `next-themes` library to handle theme management.
 *
 * @param children - The child components to be rendered within the theme provider.
 * @param props - Additional props to be passed to the `next-themes` `ThemeProvider` component.
 * @returns A React component that provides theme management for the application.
 */
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
