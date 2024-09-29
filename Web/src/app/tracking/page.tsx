'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { differenceInSeconds, format, isWithinInterval } from 'date-fns';
import BasicLayout from '@/layout/BasicLayout';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const mockCoordinates = [
    { lat: 40.7128, lng: -74.006, timestamp: new Date('2023-01-01T10:00:00') },
    { lat: 40.7136, lng: -74.0059, timestamp: new Date('2023-01-01T10:05:00') },
    { lat: 40.7142, lng: -74.0055, timestamp: new Date('2023-01-01T10:10:00') },
    { lat: 40.715, lng: -74.005, timestamp: new Date('2023-01-01T10:15:00') },
    { lat: 40.7156, lng: -74.0045, timestamp: new Date('2023-01-01T10:20:00') },
];

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};

const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
};

const encodePolyline = (coordinates: { lat: number; lng: number }[]) => {
    const factor = 1e5;

    const encodeNumber = (num: number) => {
        num = Math.round(num * factor);
        num = num << 1;
        if (num < 0) {
            num = ~num;
        }
        let result = '';
        while (num >= 0x20) {
            result += String.fromCharCode((0x20 | (num & 0x1f)) + 63);
            num >>= 5;
        }
        result += String.fromCharCode(num + 63);
        return result;
    };

    let result = '';
    let lastLat = 0;
    let lastLng = 0;

    for (const coord of coordinates) {
        const lat = coord.lat;
        const lng = coord.lng;
        result += encodeNumber(lat - lastLat);
        result += encodeNumber(lng - lastLng);
        lastLat = lat;
        lastLng = lng;
    }

    return result;
};

export default function Component() {
    const [startTime, setStartTime] = useState<Date | undefined>(mockCoordinates[0].timestamp);
    const [endTime, setEndTime] = useState<Date | undefined>(mockCoordinates[mockCoordinates.length - 1].timestamp);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [appliedStartTime, setAppliedStartTime] = useState<Date | undefined>(startTime);
    const [appliedEndTime, setAppliedEndTime] = useState<Date | undefined>(endTime);

    const filteredCoordinates = useMemo(() => {
        if (!startTime || !endTime) return mockCoordinates;
        return mockCoordinates.filter((coord) => isWithinInterval(coord.timestamp, { start: startTime, end: endTime }));
    }, [startTime, endTime]);

    const mapCenter = useMemo(() => {
        if (filteredCoordinates.length === 0) return { lat: 0, lng: 0 };
        const latSum = filteredCoordinates.reduce((sum, coord) => sum + coord.lat, 0);
        const lngSum = filteredCoordinates.reduce((sum, coord) => sum + coord.lng, 0);
        return {
            lat: latSum / filteredCoordinates.length,
            lng: lngSum / filteredCoordinates.length,
        };
    }, [filteredCoordinates]);

    const { totalDistance, maxSpeed, avgSpeed, timeTaken } = useMemo(() => {
        if (filteredCoordinates.length < 2) {
            return { totalDistance: 0, maxSpeed: 0, avgSpeed: 0, timeTaken: 0 };
        }

        let totalDistance = 0;
        let maxSpeed = 0;
        const timeTaken = differenceInSeconds(filteredCoordinates[filteredCoordinates.length - 1].timestamp, filteredCoordinates[0].timestamp);

        for (let i = 1; i < filteredCoordinates.length; i++) {
            const prevCoord = filteredCoordinates[i - 1];
            const currCoord = filteredCoordinates[i];
            const segmentDistance = calculateDistance(prevCoord.lat, prevCoord.lng, currCoord.lat, currCoord.lng);
            totalDistance += segmentDistance;

            const segmentTime = differenceInSeconds(currCoord.timestamp, prevCoord.timestamp);
            const segmentSpeed = (segmentDistance / segmentTime) * 3600; // km/h
            maxSpeed = Math.max(maxSpeed, segmentSpeed);
        }

        const avgSpeed = (totalDistance / timeTaken) * 3600; // km/h

        return {
            totalDistance: parseFloat(totalDistance.toFixed(2)),
            maxSpeed: parseFloat(maxSpeed.toFixed(2)),
            avgSpeed: parseFloat(avgSpeed.toFixed(2)),
            timeTaken,
        };
    }, [filteredCoordinates]);

    const mapUrl = useMemo(() => {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        const size = '600x400';
        const zoom = 13;
        const mapType = 'roadmap';
        const encodedPath = encodePolyline(filteredCoordinates);

        return `https://maps.googleapis.com/maps/api/staticmap?size=${size}&center=${mapCenter.lat},${mapCenter.lng}&zoom=${zoom}&maptype=${mapType}&path=weight:3%7Ccolor:blue%7Cenc:${encodedPath}&key=${apiKey}`;
    }, [filteredCoordinates, mapCenter]);

    const handleApplyFilters = () => {
        setAppliedStartTime(startTime);
        setAppliedEndTime(endTime);
        setIsFilterOpen(false);
    };

    return (
        <BasicLayout>
            <div className='container mx-auto p-4'>
                <div className='flex justify-between mb-4'>
                    <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
                        <SheetTrigger asChild>
                            <Button>Filter</Button>
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Filter Options</SheetTitle>
                            </SheetHeader>
                            <div className='space-y-4 mt-4'>
                                <div className='space-y-2'>
                                    <Label>Start Date</Label>
                                    <Calendar mode='single' selected={startTime} onSelect={setStartTime} className='rounded-md border' />
                                </div>
                                <div className='space-y-2'>
                                    <Label>End Date</Label>
                                    <Calendar mode='single' selected={endTime} onSelect={setEndTime} className='rounded-md border' />
                                </div>
                                <Button onClick={handleApplyFilters}>Apply Filters</Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className='mb-4'>
                    <Image src={mapUrl} alt='Route Map' width={600} height={400} className='rounded-lg shadow-lg' />
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Total Distance</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-2xl font-bold'>{totalDistance} km</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Max Speed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-2xl font-bold'>{maxSpeed} km/h</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Avg Speed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-2xl font-bold'>{avgSpeed} km/h</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Time Taken</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className='text-2xl font-bold'>{format(new Date(timeTaken * 1000), 'HH:mm:ss')}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </BasicLayout>
    );
}
