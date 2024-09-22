'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { JSX, SVGProps, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

const themeMapping: Record<string, string> = {
    light: 'Default',
    'dark-classic': 'Dark',
    tangerine: 'Tangerine',
    'dark-tangerine': 'Tangerine (dark)',
    mint: 'Mint',
    'dark-mint': 'Mint (dark)',
};

const NavigationComponent = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <nav className='fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90'>
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex justify-between h-14 items-center'>
                    <Link href='#' className='flex items-center' prefetch={false}>
                        <MountainIcon className='h-6 w-6' />
                        <span className='sr-only'>Acme Inc</span>
                    </Link>
                    <nav className='hidden md:flex gap-4'>
                        <Link href='/' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Home
                        </Link>
                        <Link href='/progress' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Progress
                        </Link>
                        <Link href='/about' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            About
                        </Link>
                        <Link href='/contact' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Contact
                        </Link>
                    </nav>
                    <div className='flex items-center gap-4'>
                        <Button variant='outline' size='sm'>
                            Sign in
                        </Button>
                        <Button size='sm'>Sign up</Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        >
            <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
        </svg>
    );
}

export default NavigationComponent;
