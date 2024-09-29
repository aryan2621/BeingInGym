'use client';
const YOUTUBE_BASE_URL = 'https://www.youtube.com/embed/';
interface PlayerComponentProps {
    videoId: string; // Now accepting videoId directly
}

const PlayerComponent = ({ videoId }: PlayerComponentProps) => {
    return (
        <div className='mx-auto bg-white shadow-lg rounded-lg overflow-hidden'>
            <iframe
                id='player'
                className='w-full aspect-video'
                src={`${YOUTUBE_BASE_URL}${videoId}?enablejsapi=1&version=3`}
                style={{ border: 'none' }}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
            />
        </div>
    );
};

export default PlayerComponent;
