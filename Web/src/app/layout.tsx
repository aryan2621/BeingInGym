import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Providers from '@/utils/react-query';
import { ThemeProvider } from '@/providers/themeProvider';
import { ConvexClientProvider } from '@/providers/convexProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
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
                <ConvexClientProvider>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        <Providers>
                            {children}
                            <Toaster />
                        </Providers>
                    </ThemeProvider>
                </ConvexClientProvider>
            </body>
        </html>
    );
}
