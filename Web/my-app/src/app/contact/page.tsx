'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { MessageSquare, ThumbsUp, HelpCircle } from 'lucide-react';
import BasicLayout from '@/layout/BasicLayout';

const ContactFAQPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => setFormSubmitted(false), 5000);
    };

    return (
        <BasicLayout>
            <div className='container mx-auto px-4 py-12'>
                <h1 className='text-4xl font-bold mb-12 text-center'>Contact Us & Support</h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                    <section>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <MessageSquare className='h-6 w-6' />
                                    Contact Us
                                </CardTitle>
                                <CardDescription>Have a question or need assistance? We&apos;re here to help!</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <Input placeholder='Your Name' required />
                                    <Input type='email' placeholder='Your Email' required />
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select a topic' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='general'>General Inquiry</SelectItem>
                                            <SelectItem value='technical'>Technical Support</SelectItem>
                                            <SelectItem value='billing'>Billing Question</SelectItem>
                                            <SelectItem value='feature'>Feature Request</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Textarea placeholder='Your message' required rows={5} />
                                    <Button type='submit' className='w-full'>
                                        Send Message
                                    </Button>
                                </form>
                                {formSubmitted && (
                                    <Alert className='mt-4'>
                                        <AlertTitle>Success!</AlertTitle>
                                        <AlertDescription>Your message has been sent. We&apos;ll get back to you soon.</AlertDescription>
                                    </Alert>
                                )}
                            </CardContent>
                        </Card>
                    </section>

                    <section>
                        <Card>
                            <CardHeader>
                                <CardTitle className='flex items-center gap-2'>
                                    <ThumbsUp className='h-6 w-6' />
                                    Provide Feedback
                                </CardTitle>
                                <CardDescription>Your feedback helps us improve. Let us know what you think!</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className='space-y-4'>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Select feedback type' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='suggestion'>Suggestion</SelectItem>
                                            <SelectItem value='bug'>Bug Report</SelectItem>
                                            <SelectItem value='praise'>Praise</SelectItem>
                                            <SelectItem value='other'>Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Textarea placeholder='Your feedback' required rows={10} />
                                    <Button type='submit' className='w-full'>
                                        Submit Feedback
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                <section className='mt-16'>
                    <Card>
                        <CardHeader>
                            <CardTitle className='flex items-center gap-2'>
                                <HelpCircle className='h-6 w-6' />
                                Frequently Asked Questions
                            </CardTitle>
                            <CardDescription>Quick answers to common questions about HealthTrack Pro</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type='single' collapsible className='w-full'>
                                <AccordionItem value='item-1'>
                                    <AccordionTrigger>How do I start tracking my workouts?</AccordionTrigger>
                                    <AccordionContent>
                                        To start tracking your workouts, simply log into your HealthTrack Pro account and click on the &quot;New
                                        Workout&quot; button. Choose your activity type, enter the details, and click &quot;Save&quot; when
                                        you&apos;re done. Your workout will be logged and added to your fitness history.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-2'>
                                    <AccordionTrigger>Can I connect my fitness devices to HealthTrack Pro?</AccordionTrigger>
                                    <AccordionContent>
                                        Yes! HealthTrack Pro supports integration with a wide range of fitness devices and apps. Go to your account
                                        settings, select &quot;Connected Devices,&quot; and follow the prompts to connect your device or app.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-3'>
                                    <AccordionTrigger>How do I set up and track my fitness goals?</AccordionTrigger>
                                    <AccordionContent>
                                        To set up a new goal, navigate to the &quot;Goals&quot; section of your dashboard. Click &quot;Create New
                                        Goal,&quot; select your goal type (e.g., weight loss, running distance), set your target, and choose a
                                        deadline. HealthTrack Pro will automatically track your progress based on your logged activities and
                                        measurements.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-4'>
                                    <AccordionTrigger>What types of analytics does HealthTrack Pro offer?</AccordionTrigger>
                                    <AccordionContent>
                                        HealthTrack Pro provides a comprehensive suite of analytics, including workout trends, performance metrics,
                                        body composition changes, and goal progress. You can customize your dashboard to display the metrics most
                                        important to you and generate detailed reports for deeper insights.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value='item-5'>
                                    <AccordionTrigger>How can I access the video tutorials?</AccordionTrigger>
                                    <AccordionContent>
                                        Video tutorials are available in the &quot;Learn&quot; section of the app. Browse categories or use the search
                                        function to find specific tutorials. Pro and Elite subscribers have unlimited access to all video content,
                                        while Basic users can access a limited number of tutorials per month.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </BasicLayout>
    );
};

export default ContactFAQPage;
