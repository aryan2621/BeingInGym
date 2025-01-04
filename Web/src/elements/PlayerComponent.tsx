'use client';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';
import HeroVideoDialog from '@/components/ui/hero-video-dialog';

interface PlayerComponentProps {
    videoId: string; // Now accepting videoId directly
    thumbnailUrl: string;
}

const PlayerComponent = ({ videoId, thumbnailUrl }: PlayerComponentProps) => {
    return (
        <div className='mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
            <HeroVideoDialog
                animationStyle='top-in-bottom-out'
                videoSrc={`${YOUTUBE_BASE_URL}${videoId}?si=4rb-zSdDkVK9qxxb`}
                thumbnailSrc={thumbnailUrl}
                thumbnailAlt='Hero Video'
            />
        </div>
    );
};

export default PlayerComponent;
