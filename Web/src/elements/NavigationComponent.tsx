'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Dumbbell, User, LogOut, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const NavigationComponent = () => {
    return (
        <nav className='fixed inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90'>
            <div className='w-full max-w-7xl mx-auto px-4'>
                <div className='flex justify-between h-14 items-center'>
                    <Link href='/' className='flex items-center' prefetch={false}>
                        <Dumbbell className='h-6 w-6' />
                        <span className='sr-only'>Acme Inc</span>
                    </Link>
                    <nav className='hidden md:flex gap-4'>
                        <Link href='/' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Home
                        </Link>
                        <Link href='/tutorial' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Tutorial
                        </Link>
                        <Link href='/practise' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Practise
                        </Link>
                        <Link href='/progress' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Progress
                        </Link>
                        <Link href='/goals' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Goals
                        </Link>
                        <Link href='/tracking' className='font-medium flex items-center text-sm transition-colors hover:underline' prefetch={false}>
                            Tracking
                        </Link>
                    </nav>
                    <div className='flex items-center gap-4'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                    <User className='h-5 w-5' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <User className='mr-2 h-4 w-4' />
                                    <Link href='/contact'>Contact</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className='mr-2 h-4 w-4' />
                                    <Link href='/about'>About</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut className='mr-2 h-4 w-4' />
                                    <Link href='/profile'>Profile</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavigationComponent;
