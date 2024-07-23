import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { Excercises, Excercise } from '../utils/dummyData';
import { fetchPlaylist } from '../services/Videos';
import PlayerComponent from '../components/YoutubePlayer';

const channelIdsMappingWithExercises = {
    [Excercise.Cardio]: 'PL7Ax6CP9_hgPM5IQBajGHgd2zLmMPc-GV',
    [Excercise.Legs]: 'PLRCgg2aTq5NUTw6HGN6H5cLapjVU8PCK2',
    [Excercise.Arms]: 'PLRCgg2aTq5NWN3sesjov3AZPptBHsFtvP',
    [Excercise.Back]: 'PLLALQuK1NDrgbrHnrWt_TaQK1sSraAQ1U',
    [Excercise.Chest]: 'PLrzjnSr6-vrLgPRXSgfY8XjlTKN2UppYt',
    [Excercise.Shoulders]: 'PLvD1E8X4SsD-x9_FAQnsU_dScAt0u-7y_',
    [Excercise.Abs]: 'PLvf_LH4Nzg13MLtme6A4pWL8rndhXcYQq'
}

const Tutorial = () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const [details, setDetails] = useState<any>([]);
    const [mainVideoId, setMainVideoId] = useState<string | null>(null);

    const displayValue = Excercises[selectedIndex.row];

    useEffect(() => {
        const playLists = async (playlistId: string) => {
            return await fetchPlaylist(playlistId);
        }
        const fetchVideos = async () => {
            const response = await playLists(channelIdsMappingWithExercises[displayValue]);
            setDetails(response.items);
            if (response.items.length > 0) {
                setMainVideoId(response.items[0].snippet.resourceId.videoId);
            }
        }
        fetchVideos();
    }, [selectedIndex]);
    return (
        <View style={styles.container}>
            <Select
                selectedIndex={selectedIndex}
                value={displayValue}
                onSelect={(index: IndexPath) => setSelectedIndex(index)}
                style={styles.select}>
                {Excercises.map((exercise, index) => (
                    <SelectItem key={index} title={exercise} />
                ))}
            </Select>
            {mainVideoId && (
                <Layout style={[styles.videoContainer]}>
                    <PlayerComponent videoId={mainVideoId} />
                </Layout>
            )}
            <Text style={styles.instructionText}>Select a video to watch</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.thumbnailsContainer}>
                    {details.map((video: any) => (
                        <TouchableOpacity key={video.snippet.resourceId.videoId} onPress={() => setMainVideoId(video.snippet.resourceId.videoId)}>
                            <Layout style={styles.thumbnailContainer}>
                                <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={styles.thumbnail} />
                                <Text style={styles.videoTitle}>{video.snippet.title}</Text>
                            </Layout>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f7f9fc',
    },
    select: {
        marginBottom: 16,
    },
    videoContainer: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 16,
    },
    scrollContainer: {
        paddingBottom: 16,
    },
    instructionText: {
        fontWeight: 'bold',
        marginBottom: 16,
    },
    thumbnailsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    thumbnailContainer: {
        width: 150,
        marginHorizontal: 8,
        marginBottom: 16,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    thumbnail: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    videoTitle: {
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center',
    },
});

export default Tutorial;
