import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import Providers from '@/utils/react-query';

const inter = Inter({ subsets: ['latin'] });

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export const metadata: Metadata = {
    title: 'BeingInGym',
    description: 'A gym management app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html suppressHydrationWarning lang='en'>
            <head />

            <body className={inter.className}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <Providers>
                        {children}
                        <Toaster />
                    </Providers>
                </ThemeProvider>
            </body>
        </html>
    );
}
