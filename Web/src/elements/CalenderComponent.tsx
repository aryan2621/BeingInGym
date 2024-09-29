'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const RenderEvents: React.FC<{ selectedEvents: Event[]; handleDeleteEvent: (eventId: string) => void }> = ({ selectedEvents, handleDeleteEvent }) => {
    return (
        <Dialog>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Events</DialogTitle>
                </DialogHeader>
                <div className='py-4'>
                    {selectedEvents.length > 0 ? (
                        selectedEvents.map((event) => (
                            <div
                                key={event.id}
                                className='flex justify-between items-center p-2 mb-2 rounded'
                                style={{ backgroundColor: event.color }}
                            >
                                <span>{event.title}</span>
                                <Button variant='ghost' size='icon' onClick={() => handleDeleteEvent(event.id)}>
                                    <Trash2 className='h-4 w-4' />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p>No events for this period.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

interface Event {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    color: string;
}

interface RenderDayProps {
    currentDate: Date;
    getEventsForDate: (date: Date) => Event[];
}

const RenderDayView: React.FC<RenderDayProps> = ({ currentDate, getEventsForDate }) => {
    const dayEvents = getEventsForDate(currentDate);
    return (
        <div className='border rounded-lg p-6 h-[calc(100vh-200px)] overflow-y-auto'>
            <h3 className='text-xl font-semibold mb-4'>{currentDate.toDateString()}</h3>
            {dayEvents.length > 0 ? (
                dayEvents.map((event, index) => (
                    <div key={index} className='p-2 mb-2 rounded' style={{ backgroundColor: event.color }}>
                        {event.title}
                    </div>
                ))
            ) : (
                <p>No events for this day.</p>
            )}
        </div>
    );
};

interface RenderWeekProps {
    currentDate: Date;
    getEventsForDate: (date: Date) => Event[];
}

const RenderWeekView: React.FC<RenderWeekProps> = ({ currentDate, getEventsForDate }) => {
    const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    const days = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        const dayEvents = getEventsForDate(date);
        days.push(
            <div key={i} className='border rounded-lg p-4 h-40 overflow-y-auto'>
                <div className='font-semibold mb-2'>{date.toDateString()}</div>
                {dayEvents.map((event, index) => (
                    <div key={index} className='text-xs p-2 mb-1 rounded' style={{ backgroundColor: event.color }}>
                        {event.title}
                    </div>
                ))}
            </div>
        );
    }
    return <div className='grid grid-cols-7 gap-4'>{days}</div>;
};

interface RenderMonthProps {
    currentDate: Date;
    getEventsForDate: (date: Date) => Event[];
}

const RenderMonthView: React.FC<RenderMonthProps> = ({ currentDate, getEventsForDate }) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className='border rounded-lg p-2 h-24'></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dayEvents = getEventsForDate(date);
        days.push(
            <div key={day} className='border rounded-lg p-2 h-24 overflow-y-auto'>
                <div className='text-right'>{day}</div>
                {dayEvents.map((event, index) => (
                    <div key={index} className='text-xs p-1 mt-1 rounded' style={{ backgroundColor: event.color }}>
                        {event.title}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className='grid grid-cols-7 gap-4'>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className='text-center font-semibold p-2'>
                    {day}
                </div>
            ))}
            {days}
        </div>
    );
};
interface RenderYearProps {
    currentDate: Date;
    events: Event[];
}
const RenderYearView: React.FC<RenderYearProps> = ({ currentDate, events }) => {
    return (
        <div className='grid grid-cols-3 gap-6'>
            {monthNames.map((month, index) => (
                <div key={month} className='border rounded-lg p-4'>
                    <h4 className='font-semibold mb-2'>{month}</h4>
                    <p>
                        {
                            events.filter((event) => {
                                const eventDate = new Date(event?.startDate || '');
                                return eventDate.getMonth() === index && eventDate.getFullYear() === currentDate.getFullYear();
                            }).length
                        }{' '}
                        events
                    </p>
                </div>
            ))}
        </div>
    );
};

const EventCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [view, setView] = useState('month');
    const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);
    const [isEventListDialogOpen, setIsEventListDialogOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
    const [newEvent, setNewEvent] = useState<Event>({
        id: '',
        title: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        color: '#3B82F6',
    });
    const handlePrevious = () => {
        if (view === 'day') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1));
        } else if (view === 'week') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
        } else if (view === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
        } else if (view === 'year') {
            setCurrentDate(new Date(currentDate.getFullYear() - 1, 0, 1));
        }
    };

    const handleNext = () => {
        if (view === 'day') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1));
        } else if (view === 'week') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));
        } else if (view === 'month') {
            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        } else if (view === 'year') {
            setCurrentDate(new Date(currentDate.getFullYear() + 1, 0, 1));
        }
    };

    const handleAddEvent = () => {
        if (!newEvent.title) {
            toast({
                title: 'Error',
                description: 'Title is required',
            });
            return;
        }
        setEvents((prevEvents) => [
            ...prevEvents,
            {
                ...newEvent,
                id: Math.random().toString(36).substr(2, 9),
                endDate: newEvent.endDate || newEvent.startDate,
            },
        ]);
        setNewEvent({
            id: '',
            title: '',
            startDate: new Date().toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            color: '#3B82F6',
        });
        setIsAddEventDialogOpen(false);
    };

    const getEventsForDate = (date: Date) => {
        return events.filter((event) => {
            const eventStart = new Date(event.startDate);
            const eventEnd = new Date(event.endDate);
            return date >= eventStart && date <= eventEnd;
        });
    };
    const handleDeleteEvent = (eventId: string) => {
        setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        setSelectedEvents((prevSelected) => prevSelected.filter((event) => event.id !== eventId));
        toast({
            title: 'Event deleted',
            description: 'The event has been successfully deleted.',
        });
    };
    return (
        <div className='p-6 max-w-6xl mx-auto'>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex items-center space-x-4'>
                    <Select value={view} onValueChange={setView}>
                        <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Select view' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='day'>Day</SelectItem>
                            <SelectItem value='week'>Week</SelectItem>
                            <SelectItem value='month'>Month</SelectItem>
                            <SelectItem value='year'>Year</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant='outline' size='icon' onClick={handlePrevious}>
                        <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <span className='text-lg font-semibold'>
                        {view === 'day' && currentDate.toDateString()}
                        {view === 'week' && `Week of ${currentDate.toDateString()}`}
                        {view === 'month' && `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                        {view === 'year' && currentDate.getFullYear()}
                    </span>
                    <Button variant='outline' size='icon' onClick={handleNext}>
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                </div>
                <div>
                    <Button onClick={() => setIsAddEventDialogOpen(true)}>Add Event</Button>
                </div>
            </div>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    {view === 'day' && RenderDayView({ currentDate, getEventsForDate })}
                    {view === 'week' && RenderWeekView({ currentDate, getEventsForDate })}
                    {view === 'month' && RenderMonthView({ currentDate, getEventsForDate })}
                    {view === 'year' && RenderYearView({ currentDate, events })}
                </motion.div>
            </AnimatePresence>

            <Dialog open={isAddEventDialogOpen} onOpenChange={setIsAddEventDialogOpen}>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Add New Event</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='title' className='text-right'>
                                Title
                            </Label>
                            <Input
                                id='title'
                                value={newEvent.title}
                                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='startDate' className='text-right'>
                                Start Date
                            </Label>
                            <Input
                                id='startDate'
                                type='date'
                                value={newEvent.startDate}
                                onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='endDate' className='text-right'>
                                End Date
                            </Label>
                            <Input
                                id='endDate'
                                type='date'
                                value={newEvent.endDate}
                                onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label htmlFor='color' className='text-right'>
                                Color
                            </Label>
                            <Input
                                id='color'
                                type='color'
                                value={newEvent.color}
                                onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                                className='col-span-3'
                            />
                        </div>
                    </div>
                    <Button onClick={handleAddEvent}>Add Event</Button>
                </DialogContent>
            </Dialog>

            <Dialog open={isEventListDialogOpen} onOpenChange={setIsEventListDialogOpen}>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Events</DialogTitle>
                    </DialogHeader>
                    <div className='py-4'>
                        {selectedEvents.length > 0 ? (
                            selectedEvents.map((event) => (
                                <div
                                    key={event.id}
                                    className='flex justify-between items-center p-2 mb-2 rounded'
                                    style={{ backgroundColor: event.color }}
                                >
                                    <span>{event.title}</span>
                                    <Button variant='ghost' size='icon' onClick={() => handleDeleteEvent(event.id)}>
                                        <Trash2 className='h-4 w-4' />
                                    </Button>
                                </div>
                            ))
                        ) : (
                            <p>No events for this period.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default EventCalendar;
