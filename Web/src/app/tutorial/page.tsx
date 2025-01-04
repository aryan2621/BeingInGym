'use client';

import { useState, useEffect, useRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Exercise } from '@/utils/enum';
import { fetchPlaylist } from '@/service/video';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import PlayerComponent from '@/elements/PlayerComponent';
import Image from 'next/image';
import BasicLayout from '@/layout/BasicLayout';

const channelIdsMappingWithExercises: Record<Exercise, string> = {
    [Exercise.Cardio]: 'PL7Ax6CP9_hgPM5IQBajGHgd2zLmMPc-GV',
    [Exercise.Legs]: 'PLRCgg2aTq5NUTw6HGN6H5cLapjVU8PCK2',
    [Exercise.Arms]: 'PLRCgg2aTq5NWN3sesjov3AZPptBHsFtvP',
    [Exercise.Back]: 'PLLALQuK1NDrgbrHnrWt_TaQK1sSraAQ1U',
    [Exercise.Chest]: 'PLrzjnSr6-vrLgPRXSgfY8XjlTKN2UppYt',
    [Exercise.Shoulders]: 'PLvD1E8X4SsD-x9_FAQnsU_dScAt0u-7y_',
    [Exercise.Abs]: 'PLvf_LH4Nzg13MLtme6A4pWL8rndhXcYQq',
};

export default function TutorialPage() {
    const [selectedExercise, setSelectedExercise] = useState<Exercise>(Exercise.Cardio);
    const [videos, setVideos] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [mainVideoId, setMainVideoId] = useState<string>('');
    const [mainVideoUrl, setMainVideoUrl] = useState<string>('');
    const mainVideoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            const playlistId = channelIdsMappingWithExercises[selectedExercise];
            const data = await fetchPlaylist(playlistId);
            setVideos(data.items || []);
            setLoading(false);
        };
        setLoading(true);
        fetchVideos();
    }, [selectedExercise]);

    useEffect(() => {
        if (videos.length > 0) {
            setMainVideoId(videos[0].snippet.resourceId.videoId);
            setMainVideoUrl(videos[0].snippet.thumbnails.maxres.url);
        }
    }, [videos]);

    const handleVideoClick = (videoId: string, url: string) => {
        setMainVideoId(videoId);
        setMainVideoUrl(url);
        mainVideoRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <BasicLayout>
            <div className='container mx-auto p-4 min-h-screen flex flex-col justify-center items-center'>
                {loading ? (
                    <div className='flex justify-center items-center h-full'>
                        <Loader className='animate-spin' />
                    </div>
                ) : videos.length === 0 ? (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className='text-center mt-4 text-gray-600'>
                        No videos found
                    </motion.p>
                ) : (
                    <>
                        <Select onValueChange={(value: string) => setSelectedExercise(value as Exercise)} defaultValue={Exercise.Cardio}>
                            <SelectTrigger className='rounded-md border border-gray-300 w-64'>
                                <SelectValue placeholder='Select exercise' />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(Exercise).map((exercise: Exercise) => (
                                    <SelectItem key={exercise} value={exercise}>
                                        {exercise}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div
                            ref={mainVideoRef}
                            className='mt-6 w-full rounded-lg overflow-hidden shadow-lg relative bg-white transition-shadow duration-300 hover:shadow-xl'
                        >
                            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }} className='p-2 rounded-md'>
                                <PlayerComponent videoId={mainVideoId} thumbnailUrl={mainVideoUrl} />
                            </motion.div>
                        </div>

                        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {videos.map((video) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * videos.indexOf(video), duration: 0.4 }}
                                    className='shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105'
                                    onClick={() => handleVideoClick(video.snippet.resourceId.videoId, video.snippet.thumbnails.maxres.url)}
                                >
                                    <div className='relative w-full h-48 overflow-hidden rounded-t-lg'>
                                        <Image
                                            src={video.snippet.thumbnails.maxres.url}
                                            alt={video.snippet.title}
                                            layout='fill'
                                            objectFit='cover'
                                            className='transition-transform duration-300 transform hover:scale-110'
                                        />
                                    </div>
                                    <div className='p-4'>
                                        <h3 className='text-lg font-bold line-clamp-2'>{video.snippet.title}</h3>
                                        <p className='mt-2 text-sm text-foreground line-clamp-2'>{video.snippet.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </BasicLayout>
    );
}
