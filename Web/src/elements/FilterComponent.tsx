'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const FilterComponent = () => {
    const [exerciseType, setExerciseType] = useState('arms');
    const [timeType, setTimeType] = useState('relative');
    const [relativeTimeUnit, setRelativeTimeUnit] = useState('day');
    const [relativeTimeValue, setRelativeTimeValue] = useState([1]);
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    return (
        <div className='w-full max-w-6xl mx-auto p-6'>
            <div className='flex flex-wrap items-start gap-4 min-w-[800px]'>
                <Select
                    value={exerciseType}
                    onValueChange={(value) => {
                        setExerciseType(value);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder='Select exercise types' />
                    </SelectTrigger>
                    <SelectContent>
                        {['Arms', 'Legs', 'Cardio', 'Others'].map((type) => (
                            <SelectItem key={type} value={type.toLowerCase()}>
                                {type}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Tabs value={timeType} onValueChange={setTimeType} className='w-full'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='relative'>Relative</TabsTrigger>
                        <TabsTrigger value='absolute'>Absolute</TabsTrigger>
                    </TabsList>
                    <TabsContent value='relative' className='space-y-4 min-h-[300px]'>
                        <Select value={relativeTimeUnit} onValueChange={setRelativeTimeUnit}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select time unit' />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='day'>Day</SelectItem>
                                <SelectItem value='week'>Week</SelectItem>
                                <SelectItem value='month'>Month</SelectItem>
                            </SelectContent>
                        </Select>

                        <Slider
                            defaultValue={[1]}
                            max={relativeTimeUnit === 'day' ? 30 : relativeTimeUnit === 'week' ? 12 : 12}
                            step={1}
                            onValueChange={setRelativeTimeValue}
                        />
                        <Badge>
                            {relativeTimeValue[0]} {relativeTimeUnit}
                            {relativeTimeValue[0] > 1 ? 's' : ''}
                        </Badge>
                    </TabsContent>
                    <TabsContent value='absolute' className='space-y-4 min-h-[300px]'>
                        <div className='flex justify-around space-x-4'>
                            <div className='space-y-2'>
                                <Label>Start Date</Label>
                                <Calendar
                                    mode='single'
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    className='rounded-md border min-h-[300px] min-w-[200px]'
                                />
                            </div>
                            <div className='space-y-2'>
                                <Label>End Date</Label>
                                <Calendar
                                    mode='single'
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    className='rounded-md border min-h-[300px] min-w-[200px]'
                                />
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default FilterComponent;
