'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Heart, Zap, Trophy } from 'lucide-react';
import BasicLayout from '@/layout/BasicLayout';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface StatCardProps {
    icon: React.ReactNode;
    value: number | string;
    label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
    <Card className='transition hover:shadow-xl'>
        <CardContent className='flex flex-col items-center justify-center p-6'>
            <div className='text-center'>{icon}</div>
            <p className='text-3xl font-bold mt-4'>{value}</p>
            <p className='text-sm text-muted-foreground'>{label}</p>
        </CardContent>
    </Card>
);

export default function Component() {
    return (
        <BasicLayout>
            <div className='container mx-auto px-4 py-12'>
                <section className='relative py-20 overflow-hidden rounded-lg shadow-xl shadow-glow'>
                    <div className="absolute inset-0 bg-[url('/hero.jpeg')] bg-cover bg-center opacity-20 shadow-glow"></div>
                    <div className='absolute inset-0 rounded-lg opacity-30 blur-md'></div>
                    <div className='container mx-auto px-4 relative z-10'>
                        <header className='text-center mb-12'>
                            <Badge variant='secondary' className='mb-4 hover:bg-white/30'>
                                Your Path to Better Health
                            </Badge>
                            <h1 className='text-5xl font-bold mb-4'>Welcome to HealthTrack Pro</h1>
                            <p className='text-xl max-w-2xl mx-auto mb-8'>
                                Empowering you to take control of your health journey with cutting-edge technology and personalized insights.
                            </p>
                            <Button size='lg' variant='secondary' className='text-purple-600 hover:bg-gray-100'>
                                Start Your Journey
                            </Button>
                        </header>

                        <div className='flex flex-col md:flex-row items-center gap-8'>
                            <div className='flex-1 backdrop-blur-lg rounded-lg p-6 shadow-md'>
                                <h2 className='text-2xl font-semibold mb-4'>Our Mission</h2>
                                <p className='text-lg leading-relaxed'>
                                    At HealthTrack Pro, we believe that everyone deserves the tools and knowledge to live their healthiest life. Our
                                    mission is to provide a comprehensive, user-friendly platform that not only tracks your fitness activities but
                                    also educates, motivates, and guides you towards sustainable health improvements.
                                </p>
                            </div>
                            <div className='flex-shrink-0 grid grid-cols-2 gap-4'>
                                <StatCard icon={<Heart className='h-8 w-8 text-red-300' />} value='10M+' label='Active Users' />
                                <StatCard icon={<Zap className='h-8 w-8 text-yellow-300' />} value='500K' label='Workouts Logged Daily' />
                                <StatCard icon={<Trophy className='h-8 w-8 text-green-300' />} value='5M' label='Goals Achieved' />
                                <StatCard icon={<Activity className='h-8 w-8 text-blue-300' />} value='98%' label='User Satisfaction' />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='py-20 space-y-8'>
                    <h2 className='text-3xl md:text-4xl font-bold'>
                        Discover Why<span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'> People Love </span>
                        This Landing Page
                    </h2>
                    <p className='text-xl text-muted-foreground pt-4 pb-8'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis illo
                    </p>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6'>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-md md:break-inside-avoid overflow-hidden'>
                            <div className='space-y-1.5 p-6 flex flex-row items-center gap-4 pb-2'>
                                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                                    <Image src='/assets/looking-ahead-DDDoMk_3.png' alt='John Doe React' width={100} height={100} />
                                </span>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold tracking-tight text-lg'>John Doe React</h3>
                                    <p className='text-sm text-muted-foreground'>@john_Doe</p>
                                </div>
                            </div>
                            <div className='p-6 pt-0'>This landing page is awesome!</div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-md md:break-inside-avoid overflow-hidden'>
                            <div className='space-y-1.5 p-6 flex flex-row items-center gap-4 pb-2'>
                                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                                    <Image src='/assets/looking-ahead-DDDoMk_3.png' alt='John Doe React' width={100} height={100} />
                                </span>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold tracking-tight text-lg'>John Doe React</h3>
                                    <p className='text-sm text-muted-foreground'>@john_Doe1</p>
                                </div>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet,empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
                            </div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-md md:break-inside-avoid overflow-hidden'>
                            <div className='space-y-1.5 p-6 flex flex-row items-center gap-4 pb-2'>
                                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                                    <Image src='/assets/looking-ahead-DDDoMk_3.png' alt='John Doe React' width={100} height={100} />
                                </span>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold tracking-tight text-lg'>John Doe React</h3>
                                    <p className='text-sm text-muted-foreground'>@john_Doe2</p>
                                </div>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet,exercitation. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
                                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                            </div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-md md:break-inside-avoid overflow-hidden'>
                            <div className='space-y-1.5 p-6 flex flex-row items-center gap-4 pb-2'>
                                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                                    <Image src='/assets/looking-ahead-DDDoMk_3.png' alt='John Doe React' width={100} height={100} />
                                </span>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold tracking-tight text-lg'>John Doe React</h3>
                                    <p className='text-sm text-muted-foreground'>@john_Doe3</p>
                                </div>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Ut enim ad minim veniam.
                            </div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-md md:break-inside-avoid overflow-hidden'>
                            <div className='space-y-1.5 p-6 flex flex-row items-center gap-4 pb-2'>
                                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                                    <Image src='/assets/looking-ahead-DDDoMk_3.png' alt='John Doe React' width={100} height={100} />
                                </span>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold tracking-tight text-lg'>John Doe React</h3>
                                    <p className='text-sm text-muted-foreground'>@john_Doe4</p>
                                </div>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet, tempor incididunt aliqua. Ut enim ad minim veniam, quis nostrud.
                            </div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm max-w-md md:break-inside-avoid overflow-hidden'>
                            <div className='space-y-1.5 p-6 flex flex-row items-center gap-4 pb-2'>
                                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                                    <Image src='https://github.com/shadcn.png' alt='John Doe React' width={100} height={100} />
                                </span>
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold tracking-tight text-lg'>John Doe React</h3>
                                    <p className='text-sm text-muted-foreground'>@john_Doe5</p>
                                </div>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </div>
                        </div>
                    </div>
                </section>
                <section className='py-20 space-y-8'>
                    <h2 className='text-3xl lg:text-4xl font-bold md:text-center'>
                        Many <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>Great Features</span>
                    </h2>
                    <div className='flex flex-wrap md:justify-center gap-4'>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Dark/Light theme
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Reviews
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Features
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Pricing
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Contact form
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Our team
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Responsive design
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Newsletter
                            </div>
                        </div>
                        <div>
                            <div className='inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 text-sm'>
                                Minimalist
                            </div>
                        </div>
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
                            <div className='flex flex-col space-y-1.5 p-6'>
                                <h3 className='text-2xl font-semibold leading-none tracking-tight'>Responsive Design</h3>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.
                            </div>
                            <div className='flex items-center p-6 pt-0'>
                                <Image src='/assets/looking-ahead-DDDoMk_3.png' alt='About feature' width={200} height={300} />
                            </div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
                            <div className='flex flex-col space-y-1.5 p-6'>
                                <h3 className='text-2xl font-semibold leading-none tracking-tight'>Intuitive user interface</h3>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.
                            </div>
                            <div className='flex items-center p-6 pt-0'>
                                <Image src='/assets/reflecting-tA1rdXzJ.png' alt='About feature' width={200} height={300} />
                            </div>
                        </div>
                        <div className='rounded-lg border bg-card text-card-foreground shadow-sm'>
                            <div className='flex flex-col space-y-1.5 p-6'>
                                <h3 className='text-2xl font-semibold leading-none tracking-tight'>AI-Powered insights</h3>
                            </div>
                            <div className='p-6 pt-0'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.
                            </div>
                            <div className='flex items-center p-6 pt-0'>
                                <Image src='/assets/growth-DZ7EdHJS.png' alt='About feature' width={200} height={300} />
                            </div>
                        </div>
                    </div>
                </section>
                <section className='py-20 space-y-8'>
                    <h3 className='text-center text-4xl md:text-5xl font-bold'>
                        Join Our Daily <span className='bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text'>Newsletter</span>
                    </h3>
                    <p className='text-xl text-muted-foreground text-center mt-4 mb-8'>Lorem ipsum dolor sit amet consectetur.</p>
                    <form className='flex flex-col w-full md:flex-row md:w-6/12 lg:w-4/12 mx-auto gap-4 md:gap-2'>
                        <input
                            className='flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-muted/50 dark:bg-muted/80'
                            placeholder='leomirandadev@gmail.com'
                            aria-label='email'
                        />
                        <button className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'>
                            Subscribe
                        </button>
                    </form>
                </section>
            </div>
        </BasicLayout>
    );
}
