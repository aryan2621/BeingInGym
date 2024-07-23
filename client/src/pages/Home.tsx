import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import React from 'react';
import { Colors } from '../styles';
import PieChartComponent from '../components/PieChart';
import BarChartComponent from '../components/BarChart';
import PlayerComponent from '../components/YoutubePlayer';
import CalendarComponent from '../components/Calender';

const Home = () => {
    const galleryImages = [
        require('../assets/SignUp.jpeg'),
        require('../assets/SignUp.jpeg'),
        require('../assets/SignUp.jpeg'),
        require('../assets/SignUp.jpeg'),
    ];
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.bannerContainer}>
                    <Image
                        style={styles.banner}
                        source={require('../assets/Bannr.jpeg')}
                    />
                </View>
                <Text style={styles.text}>
                    Transform your life with the power of habit
                </Text>
                <ScrollView
                    style={styles.galleryContainer}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {galleryImages.map((image, index) => (
                        <Image
                            key={index}
                            style={styles.galleryImage}
                            source={image}
                        />
                    ))}
                </ScrollView>
                <Text style={styles.chartTitle}>Keep track of your progress</Text>
                <PieChartComponent />

                <Text style={styles.chartTitle}>Deep analysis of your habits</Text>
                <BarChartComponent />

                <Text style={styles.chartTitle}>Difficult to do ? Let's make it easy</Text>
                <PlayerComponent videoId={'CLccU7tk7es'} />

                <Text style={styles.chartTitle}>Mark your aims and achieve them</Text>
                <CalendarComponent
                    markedDates={{
                        '2017-10-25': { dots: [vacation, massage, workout], selected: true, selectedColor: 'red' },
                        '2017-10-26': { dots: [massage, workout], disabled: true }
                    }}
                    onDayPress={(day) => console.log(day)}
                />
            </ScrollView>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BackGround.Light,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    bannerContainer: {
        width: 350,
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    banner: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    text: {
        marginHorizontal: 40,
        fontSize: 25,
        color: Colors.Text.Basic,
        fontFamily: 'sans-serif',
        textAlign: 'center',
        marginBottom: 20,
    },
    galleryContainer: {
        marginTop: 20,
    },
    galleryImage: {
        width: 150,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    chartTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
        color: Colors.Text.Basic,
        textAlign: 'center',
    },
});

export default Home;
