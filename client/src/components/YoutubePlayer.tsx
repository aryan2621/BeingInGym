import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import { View, StyleSheet } from 'react-native';

interface PlayerComponentProps {
    videoId?: string;
}
const PlayerComponent = ({ videoId = 'CLccU7tk7es' }: PlayerComponentProps) => {
    return (
        <View style={styles.container}>
            <YoutubePlayer
                height={200}
                play={false}
                width={350}
                videoId={videoId}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default PlayerComponent;
