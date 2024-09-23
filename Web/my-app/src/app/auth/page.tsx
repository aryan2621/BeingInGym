'use client';
import React, { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dumbbell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { countries } from '@/utils';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
    type: 'signin' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('+91');
    const [isOtp, setIsOtp] = useState(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsOtp(true);
    };

    return (
        <div className='min-h-[150px] flex flex-col justify-between'>
            {isOtp ? (
                <div className='space-y-4 flex flex-col justify-between flex-grow'>
                    <p className='text-center text-sm'>Enter the OTP sent to your {email ? 'email' : 'phone'}</p>
                    <div style={{ display: 'flex' }} className='justify-center'>
                        <InputOTP maxLength={6}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                    <div className='flex-grow'></div>
                    <Button className='w-full'>Verify OTP</Button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className='space-y-4 flex flex-col justify-between flex-grow'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' placeholder='Ex: abc@xyz.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <div className='flex items-center justify-center'>
                        <Badge variant='secondary' className='mx-4 my-5 hover:bg-white/30'>
                            OR
                        </Badge>
                    </div>
                    <Label htmlFor='phone'>Phone</Label>
                    <div className='flex gap-2'>
                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className='w-[100px] h-10 border border-gray-300 rounded'
                        >
                            {countries.map((country, index) => (
                                <option key={index} value={country.dial_code}>
                                    {country.flag} {country.dial_code}
                                </option>
                            ))}
                        </select>
                        <Input type='tel' placeholder='Ex: 9876543210' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='flex-grow'></div>
                    <Button type='submit' className='w-full'>
                        Continue
                    </Button>
                </form>
            )}
        </div>
    );
};

export default function Component() {
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Card className='w-full max-w-md mx-auto shadow-lg'>
                <CardHeader>
                    <CardTitle className='flex justify-center items-center'>
                        <Dumbbell className='h-6 w-6 mr-2 text-blue-500' />
                        <span className='text-xl font-bold'>Fitness App</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue='signin'>
                        <TabsList className='grid w-full grid-cols-2 mb-6'>
                            <TabsTrigger value='signin'>Sign In</TabsTrigger>
                            <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                        </TabsList>
                        <TabsContent value='signin'>
                            <AuthForm type='signin' />
                        </TabsContent>
                        <TabsContent value='signup'>
                            <AuthForm type='signup' />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
