import Config from 'react-native-config';

const API_URL = Config.YOUTUBE_API;

export const fetchPlaylist = async (playListId: string) => {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playListId}&key=${API_URL}`,
  );
  return await response.json();
};
