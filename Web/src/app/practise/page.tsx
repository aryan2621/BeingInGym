'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BasicLayout from '@/layout/BasicLayout';
import { PauseIcon, PlayIcon, RotateCcwIcon, SaveIcon, HistoryIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Exercise } from '@/utils/enum';
import { ScrollArea } from '@/components/ui/scroll-area';
type TimeUnit = 'hours' | 'minutes' | 'seconds';

interface ExerciseSession {
    exercise: Exercise;
    duration: number;
    date: string;
}

const CircularTimer = ({ onSave }: { onSave: (duration: number) => void }) => {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [remainingSeconds, setRemainingSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [timeUnit, setTimeUnit] = useState<TimeUnit>('minutes');
    const [error, setError] = useState<string | null>(null);
    const [timer, setTimer] = useState<number>(0);
    const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning && remainingSeconds > 0) {
            intervalId = setInterval(() => {
                setRemainingSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (remainingSeconds === 0) {
            setIsRunning(false);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isRunning, remainingSeconds]);

    const handleStartPause = () => {
        if (remainingSeconds > 0) {
            setIsRunning(!isRunning);
        }
    };

    const handleReset = () => {
        setIsRunning(false);
        setRemainingSeconds(totalSeconds);
        setError(null);
    };

    const handleSetTimer = () => {
        if (timer <= 0) {
            setError('Please set a positive time value.');
            return;
        }

        setError(null);
        let seconds = timer;
        if (timeUnit === 'minutes') seconds *= 60;
        if (timeUnit === 'hours') seconds *= 3600;

        setTotalSeconds(seconds);
        setRemainingSeconds(seconds);
        setIsRunning(false);
    };

    const handleSave = () => {
        setShowSaveConfirmation(true);
    };

    const confirmSave = () => {
        const duration = totalSeconds - remainingSeconds;
        onSave(duration);
        setShowSaveConfirmation(false);
    };

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const progress = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;
    const strokeDasharray = `${progress} ${100 - progress}`;

    return (
        <Card className='w-full my-20 h-full max-w-md mx-auto'>
            <CardContent className='flex flex-col items-center space-y-4 p-6' style={{ minHeight: '400px' }}>
                <div className='relative w-64 h-64'>
                    <svg className='w-full h-full' viewBox='0 0 100 100'>
                        <circle className='text-muted-foreground' strokeWidth='4' stroke='currentColor' fill='transparent' r='48' cx='50' cy='50' />
                        <circle
                            className='text-primary'
                            strokeWidth='4'
                            strokeDasharray={strokeDasharray}
                            strokeLinecap='round'
                            stroke='currentColor'
                            fill='transparent'
                            r='48'
                            cx='50'
                            cy='50'
                            style={{
                                transformOrigin: '50% 50%',
                                transform: 'rotate(-90deg)',
                                transition: 'stroke-dasharray 0.3s ease',
                            }}
                        />
                    </svg>
                    <div
                        className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold tabular-nums'
                        aria-live='polite'
                    >
                        {formatTime(remainingSeconds)}
                    </div>
                </div>
                <div className='flex space-x-2 w-full'>
                    <Input
                        type='number'
                        onWheel={() => {
                            return false;
                        }}
                        value={timer}
                        onChange={(e) => {
                            if (Number(e.target.value) >= 0) {
                                setTimer(Number(e.target.value));
                            }
                        }}
                        className='w-1/2'
                    />
                    <Select value={timeUnit} onValueChange={(value: TimeUnit) => setTimeUnit(value)}>
                        <SelectTrigger className='w-1/2'>
                            <SelectValue placeholder='Select unit' />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value='hours'>Hours</SelectItem>
                            <SelectItem value='minutes'>Minutes</SelectItem>
                            <SelectItem value='seconds'>Seconds</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {error && (
                    <Alert variant='destructive'>
                        <AlertDescription id='timer-error'>{error}</AlertDescription>
                    </Alert>
                )}

                <Button onClick={handleSetTimer} className='w-full'>
                    Set Timer
                </Button>

                <div className='flex space-x-2 w-full'>
                    <Button onClick={handleStartPause} className='w-1/3'>
                        {isRunning ? <PauseIcon className='h-4 w-4 mr-2' /> : <PlayIcon className='h-4 w-4 mr-2' />}
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={handleReset} className='w-1/3'>
                        <RotateCcwIcon className='h-4 w-4 mr-2' />
                        Reset
                    </Button>
                    <Button onClick={handleSave} className='w-1/3'>
                        <SaveIcon className='h-4 w-4 mr-2' />
                        Save
                    </Button>
                </div>
            </CardContent>
            <Dialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save Exercise Session</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to save this exercise session?</p>
                    <DialogFooter>
                        <Button onClick={confirmSave}>Save</Button>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

const Stopwatch = ({ onSave }: { onSave: (duration: number) => void }) => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (isRunning) {
            intervalId = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isRunning]);

    const handleStartPause = () => {
        setIsRunning(!isRunning);
    };

    const handleReset = () => {
        setTime(0);
        setIsRunning(false);
    };

    const handleSave = () => {
        setShowSaveConfirmation(true);
    };

    const confirmSave = () => {
        onSave(Math.floor(time / 1000));
        setShowSaveConfirmation(false);
    };

    const formatTime = (milliseconds: number) => {
        const hours = Math.floor(milliseconds / 3600000);
        const minutes = Math.floor((milliseconds % 3600000) / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = milliseconds % 1000;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
    };

    return (
        <Card className='w-full my-20 h-full max-w-md mx-auto'>
            <CardContent className='flex flex-col items-center space-y-4 p-6' style={{ minHeight: '400px' }}>
                <div className='text-4xl font-bold tabular-nums tracking-tight' aria-live='polite'>
                    {formatTime(time)}
                </div>
                <div className='flex space-x-2'>
                    <Button onClick={handleStartPause} variant='outline'>
                        {isRunning ? <PauseIcon className='h-4 w-4 mr-2' /> : <PlayIcon className='h-4 w-4 mr-2' />}
                        {isRunning ? 'Pause' : 'Start'}
                    </Button>
                    <Button onClick={handleReset} variant='outline'>
                        <RotateCcwIcon className='h-4 w-4 mr-2' />
                        Reset
                    </Button>
                    <Button onClick={handleSave} variant='outline'>
                        <SaveIcon className='h-4 w-4 mr-2' />
                        Save
                    </Button>
                </div>
            </CardContent>
            <Dialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Save Exercise Session</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to save this exercise session?</p>
                    <DialogFooter>
                        <Button onClick={confirmSave}>Save</Button>
                        <DialogClose asChild>
                            <Button variant='outline'>Cancel</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default function Component() {
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(Exercise.Cardio);
    const [sessions, setSessions] = useState<ExerciseSession[]>([]);

    const handleSaveSession = (duration: number) => {
        const newSession: ExerciseSession = {
            exercise: selectedExercise,
            duration,
            date: new Date().toISOString(),
        };
        setSessions([...sessions, newSession]);
    };

    return (
        <BasicLayout>
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <Select onValueChange={(value: string) => setSelectedExercise(value as Exercise)} defaultValue={Exercise.Cardio}>
                        <SelectTrigger className='rounded-md border border-gray-300 w-64'>
                            <SelectValue placeholder='Select exercise' />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Exercise).map((exercise) => (
                                <SelectItem key={exercise} value={exercise}>
                                    {exercise}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline'>
                                <HistoryIcon className='h-4 w-4 mr-2' />
                                View History
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='sm:max-w-[425px]'>
                            <DialogHeader>
                                <DialogTitle>Exercise History</DialogTitle>
                            </DialogHeader>
                            <ScrollArea className='h-[300px] w-full rounded-md border p-4'>
                                {sessions.map((session, index) => (
                                    <div key={index} className='mb-4 p-2 border-b'>
                                        <p>
                                            <strong>Exercise:</strong> {session.exercise}
                                        </p>
                                        <p>
                                            <strong>Duration:</strong> {session.duration} seconds
                                        </p>
                                        <p>
                                            <strong>Date:</strong> {new Date(session.date).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </ScrollArea>
                        </DialogContent>
                    </Dialog>
                </div>
                <Tabs defaultValue='timer' className='w-full'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='timer'>Timer</TabsTrigger>
                        <TabsTrigger value='stopwatch'>Stopwatch</TabsTrigger>
                    </TabsList>
                    <TabsContent value='timer'>
                        <CircularTimer onSave={handleSaveSession} />
                    </TabsContent>
                    <TabsContent value='stopwatch'>
                        <Stopwatch onSave={handleSaveSession} />
                    </TabsContent>
                </Tabs>
            </div>
        </BasicLayout>
    );
}
