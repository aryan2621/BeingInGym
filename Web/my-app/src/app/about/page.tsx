'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Heart, Zap, Trophy, Check } from 'lucide-react';
import BasicLayout from '@/layout/BasicLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

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
interface PlanCardProps {
    title: string;
    price: number;
    period: string;
    features: string[];
    highlighted?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, price, period, features, highlighted = false }) => (
    <Card key={title} className={`flex flex-col justify-between ${highlighted ? 'border-primary shadow-lg sm:scale-110' : 'border-muted'}`}>
        <CardHeader>
            <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
            <CardDescription>{highlighted && <span className='text-primary font-semibold'>Recommended</span>}</CardDescription>
        </CardHeader>
        <CardContent className='flex-grow'>
            <div className='mt-4 flex items-baseline text-5xl font-extrabold'>
                {price}
                <span className='ml-1 text-2xl font-medium text-muted-foreground'>{period}</span>
            </div>
            <ul className='mt-6 space-y-4'>
                {features.map((feature) => (
                    <li key={feature} className='flex items-start'>
                        <div className='flex-shrink-0'>
                            <Check className='h-6 w-6 text-green-500' aria-hidden='true' />
                        </div>
                        <p className='ml-3 text-base text-muted-foreground'>{feature}</p>
                    </li>
                ))}
            </ul>
        </CardContent>
        <CardFooter>
            <Button className='w-full' variant={highlighted ? 'default' : 'outline'}>
                Get started
            </Button>
        </CardFooter>
    </Card>
);

export default function Component() {
    const [activeFeature, setActiveFeature] = useState('exercise');
    const [annualBilling, setAnnualBilling] = useState(false);
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
                <section className='mb-16 mt-10'>
                    <h2 className='text-3xl font-semibold mb-8 text-center'>Choose Your Plan</h2>
                    <div className='flex items-center justify-center mb-4'>
                        <span className='mr-2'>Monthly Billing</span>
                        <Switch id='billingSwitch' checked={annualBilling} onCheckedChange={() => setAnnualBilling(!annualBilling)} />
                        <span className='ml-2'>Annual Billing</span>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-10'>
                        <PlanCard
                            title='Basic'
                            price={annualBilling ? 99 : 10}
                            period={annualBilling ? '/year' : '/month'}
                            features={['Access to workout tracking', 'Basic analytics', 'Community support']}
                        />
                        <PlanCard
                            title='Pro'
                            price={annualBilling ? 199 : 20}
                            period={annualBilling ? '/year' : '/month'}
                            features={['All Basic features', 'Advanced analytics', 'Goal setting tools', 'Priority support']}
                            highlighted
                        />
                        <PlanCard
                            title='Elite'
                            price={annualBilling ? 299 : 30}
                            period={annualBilling ? '/year' : '/month'}
                            features={['All Pro features', 'Personalized coaching', '1-on-1 consultations', 'VIP support']}
                        />
                    </div>
                </section>
            </div>
        </BasicLayout>
    );
}
