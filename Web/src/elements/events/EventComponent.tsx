'use client';

import React, { useState, useMemo } from 'react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, addMonths, subMonths, subYears, addYears } from 'date-fns';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { EventModal } from './EventAction';
import { MonthView } from './MonthView';
import { YearView } from './YearView';

type Event = {
    id: string;
    title: string;
    start: Date;
    end: Date;
};

type ViewType = 'day' | 'week' | 'month' | 'year';

export function EventCalendar() {
    const [date, setDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<Event[]>([]);
    const [view, setView] = useState<ViewType>('month');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState<Event[] | null>(null);

    const handlePrevious = () => {
        if (view === 'day') setDate(addDays(date, -1));
        if (view === 'week') setDate(addDays(date, -7));
        if (view === 'month') setDate(subMonths(date, 1));
        if (view === 'year') setDate(subYears(date, 1));
    };

    const handleNext = () => {
        if (view === 'day') setDate(addDays(date, 1));
        if (view === 'week') setDate(addDays(date, 7));
        if (view === 'month') setDate(addMonths(date, 1));
        if (view === 'year') setDate(addYears(date, 1));
    };

    const handleYearChange = (year: string) => {
        const newDate = new Date(date);
        newDate.setFullYear(parseInt(year));
        setDate(newDate);
    };

    const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
        setEvents([...events, { ...newEvent, id: Math.random().toString() }]);
    };

    const handleEditEvent = (updatedEvent: Event) => {
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    };

    const handleDeleteEvent = (eventId: string) => {
        setEvents(events.filter((event) => event.id !== eventId));
    };

    const openModal = (events: Event[] | null = null) => {
        setSelectedEvents(events);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedEvents(null);
        setIsModalOpen(false);
    };

    const years = useMemo(() => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
    }, []);

    return (
        <div className='p-4 w-full'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center space-x-2'>
                    <Button variant='outline' size='icon' onClick={handlePrevious}>
                        <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button variant='outline' size='icon' onClick={handleNext}>
                        <ChevronRight className='h-4 w-4' />
                    </Button>
                    <h2 className='text-2xl font-bold'>{format(date, 'MMMM yyyy')}</h2>
                </div>
                <div className='flex items-center space-x-2'>
                    <Select onValueChange={(value: ViewType) => setView(value)} defaultValue={'month'}>
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
                    <Select onValueChange={handleYearChange}>
                        <SelectTrigger className='w-[100px]'>
                            <SelectValue placeholder='Year' />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={'outline'}
                                className={cn('justify-start text-left font-normal', !date && 'text-muted-foreground')}
                            >
                                <CalendarIcon className='mr-2 h-4 w-4' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0'>
                            <Calendar mode='single' selected={date} onSelect={(newDate) => newDate && setDate(newDate)} initialFocus />
                        </PopoverContent>
                    </Popover>
                    <Button  onClick={() => openModal()}>
                        Add Event
                    </Button>
                </div>
            </div>
            {view === 'day' && <DayView date={date} events={events} onEventClick={openModal} />}
            {view === 'week' && <WeekView date={date} events={events} onEventClick={openModal} />}
            {view === 'month' && <MonthView date={date} events={events} onEventClick={openModal} />}
            {view === 'year' && <YearView date={date} events={events} onEventClick={openModal} />}
            <EventModal isOpen={isModalOpen} onClose={closeModal} onAddEvent={handleAddEvent} />
        </div>
    );
}
