export const fetchPlaylist = async (playListId: string) => {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playListId}&key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    return await response.json();
};
