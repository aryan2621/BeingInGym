'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dumbbell, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { countries, OTP_TIMEOUT } from '@/utils';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { sendOtp, verifyOtp } from '@/server/auth';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { ReloadIcon } from '@radix-ui/react-icons';

export default function SignUpComponent() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('+91');
    const [otp, setOtp] = useState('');
    const [id, setId] = useState('');
    const { toast } = useToast();
    const [timer, setTimer] = useState(OTP_TIMEOUT);
    const [otpSent, setOtpSent] = useState(false);
    const router = useRouter();

    const sendOtpMutation = useMutation({
        mutationFn: (params: { email: string; phone: string; id: string }) => sendOtp(params.email, params.phone, params.id),
        onSuccess: (data) => {
            const { message, status } = data as { message: string; status: number };
            if (status === 200) {
                setOtpSent(true);
                setTimer(OTP_TIMEOUT);
                toast({
                    title: 'OTP sent',
                    description: `OTP has been sent to your ${email ? 'email' : 'phone'}`,
                });
            } else {
                toast({
                    title: 'Error',
                    description: message || 'Error sending OTP, please try again',
                });
            }
        },
        onError: (error) => {
            console.error('Error sending OTP:', error);
            toast({
                title: 'Error',
                description: 'Failed to send OTP. Please try again.',
            });
        },
    });

    const verifyOtpMutation = useMutation({
        mutationFn: (params: { otp: string; id: string }) => verifyOtp(params.otp, params.id),
        onSuccess: (data) => {
            const { message, status } = data as { message: string; status: number };
            if (status === 200) {
                toast({
                    title: 'Success',
                    description: 'OTP verified successfully',
                });
                router.push('/');
            } else {
                toast({
                    title: 'Error',
                    description: message || 'Invalid OTP. Please try again.',
                });
            }
        },
        onError: (error) => {
            console.error('Error verifying OTP:', error);
            toast({
                title: 'Error',
                description: 'Failed to verify OTP. Please try again.',
            });
        },
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!email && !phone) {
            toast({
                title: 'Error',
                description: 'Please enter either email or phone',
            });
            return;
        }
        if (email && phone) {
            toast({
                title: 'Error',
                description: 'Please enter either email or phone, not both',
            });
            return;
        }
        const newId = uuidv4();
        setId(newId);
        const fullPhone = phone ? selectedCountry + phone : '';
        sendOtpMutation.mutate({ email, phone: fullPhone, id: newId });
    };

    const handleVerifyOtp = (e: FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            toast({
                title: 'Error',
                description: 'Please enter a valid OTP',
            });
            return;
        }
        verifyOtpMutation.mutate({ otp, id });
    };

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (otpSent && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        if (timer === 0) {
            setOtpSent(false);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [otpSent, timer]);

    const formatTime = (seconds: number): string => {
        if (seconds < 60) return `${seconds}s`;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Card className='w-full max-w-md mx-auto shadow-lg'>
                <CardHeader>
                    <CardTitle className='flex justify-center items-center'>
                        <Dumbbell className='h-6 w-6 mr-2 text-blue-500' />
                        <span className='text-xl font-bold'>BeingInGym</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className='space-y-4 flex flex-col justify-between flex-grow'>
                        {!otpSent && (
                            <>
                                <div>
                                    <Label htmlFor='email' className='flex items-center mb-2'>
                                        <Mail className='mr-2 h-4 w-4' /> Email
                                    </Label>
                                    <Input
                                        id='email'
                                        type='email'
                                        placeholder='Ex: john.doe@example.com'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='flex items-center justify-center'>
                                    <Badge variant='secondary' className='mx-4 my-2 px-4 py-1'>
                                        OR
                                    </Badge>
                                </div>
                                <div>
                                    <Label htmlFor='phone' className='flex items-center mb-2'>
                                        <Phone className='mr-2 h-4 w-4' /> Phone
                                    </Label>
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
                                        <Input
                                            id='phone'
                                            type='tel'
                                            placeholder='Ex: 9876543210'
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleSubmit} disabled={sendOtpMutation.isPending}>
                                    {sendOtpMutation.isPending ? (
                                        <>
                                            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                                            {'Sending OTP...'}
                                        </>
                                    ) : (
                                        <>Send OTP</>
                                    )}
                                </Button>
                            </>
                        )}
                        {otpSent && (
                            <div className='space-y-4 flex flex-col justify-between flex-grow'>
                                <div className='flex justify-between items-center'>
                                    <p className='text-sm'>Enter the OTP sent to your {email ? 'email' : 'phone'}</p>
                                    {otpSent && <span className='text-sm text-gray-500'>{formatTime(timer)}</span>}
                                </div>
                                <div style={{ display: 'flex' }} className='justify-center'>
                                    <InputOTP value={otp} onChange={setOtp} maxLength={6}>
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
                                <Button className='w-full' onClick={handleVerifyOtp} disabled={verifyOtpMutation.isPending || otp.length !== 6}>
                                    {verifyOtpMutation.isPending ? (
                                        <>
                                            <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                                            {'Verifying...'}
                                        </>
                                    ) : (
                                        <>Verify OTP</>
                                    )}
                                </Button>
                            </div>
                        )}
                    </form>
                    <div className='text-center mt-5'>
                        <Link href='/signin' className='text-sm text-blue-500 hover:underline'>
                            Already have an account? Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
