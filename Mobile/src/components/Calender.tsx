import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface CalendarComponentProps {
    markedDates: { [key: string]: any },
    onDayPress: (day: any) => void,
}
const CalendarComponent = ({ markedDates, onDayPress }: CalendarComponentProps) => {
    return (
        <View style={styles.container}>
            <Calendar
                onDayPress={onDayPress}
                style={styles.calendar}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: 'orange',
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'blue',
                    indicatorColor: 'blue',
                    textDayFontWeight: '300',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 20,
                    textDayHeaderFontSize: 14,
                }}
                markingType={'multi-dot'}
                markedDates={markedDates}
            />
        </View>
    );
};

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
    calendar: {
        width: 350,
        height: 400,
        borderRadius: 2,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#ffffff',
    },
});

export default CalendarComponent;
