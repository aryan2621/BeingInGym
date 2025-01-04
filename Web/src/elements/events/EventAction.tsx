import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Event } from '@/model/event';

type EventModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddEvent: (event: Omit<Event, 'id'>) => void;
};

export function EventModal({ isOpen, onClose, onAddEvent }: EventModalProps) {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddEvent({ title, start: new Date(start), end: new Date(end) });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Add Event</DialogTitle>
                    <DialogDescription>Create a new event for your calendar.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='title' className='text-right'>
                                Title
                            </Label>
                            <Input id='title' value={title} onChange={(e) => setTitle(e.target.value)} className='col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='start' className='text-right'>
                                Start
                            </Label>
                            <Input id='start' type='datetime-local' value={start} onChange={(e) => setStart(e.target.value)} className='col-span-3' />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='end' className='text-right'>
                                End
                            </Label>
                            <Input id='end' type='datetime-local' value={end} onChange={(e) => setEnd(e.target.value)} className='col-span-3' />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>Add Event</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
