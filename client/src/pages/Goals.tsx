import React, { useState } from 'react';
import { View, StyleSheet, Modal, Button, Alert } from 'react-native';
import { Excercises, ExcerciseModes } from '../utils/dummyData';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import CalendarComponent from '../components/Calender';
const exerciseToColorMap: { [key: string]: string } = {
    Cardio: 'red',
    Legs: 'blue',
    Arms: 'green',
    Back: 'black',
    Chest: 'purple',
    Shoulders: 'orange',
    Abs: 'pink',
};

const Goals = () => {
    const [dates, setDates] = useState<Map<string, string[]>>(new Map<string, string[]>());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<IndexPath[]>([]);
    const [mode, setMode] = useState<IndexPath>(new IndexPath(0));

    const displayValues = selectedIndex.map(index => Excercises[index.row]);

    const onDayPress = (day: any) => {
        setSelectedDate(day.dateString);
        if (dates.has(day.dateString)) {
            setSelectedIndex(
                dates.get(day.dateString)!.map(exercise => new IndexPath(Excercises.indexOf(exercise as any)))
            );
        } else {
            setSelectedIndex([]);
        }
    };

    const getDateRange = (startDate: string, mode: string) => {
        const start = new Date(startDate);
        const end = new Date(startDate);

        const dates = [];
        switch (mode) {
            case 'Weekly':
                const startOfWeek = start.getDate() - start.getDay();
                const endOfWeek = startOfWeek + 6;
                for (let i = startOfWeek; i <= endOfWeek; i++) {
                    const date = new Date(start.setDate(i));
                    dates.push(date.toISOString().split('T')[0]);
                }
                break;
            case 'Monthly':
                const startOfMonth = new Date(start.getFullYear(), start.getMonth(), 1);
                const endOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0);
                for (let d = startOfMonth; d <= endOfMonth; d.setDate(d.getDate() + 1)) {
                    dates.push(d.toISOString().split('T')[0]);
                }
                break;
            case 'Yearly':
                const startOfYear = new Date(start.getFullYear(), 0, 1);
                const endOfYear = new Date(start.getFullYear(), 11, 31);
                for (let d = startOfYear; d <= endOfYear; d.setDate(d.getDate() + 1)) {
                    dates.push(d.toISOString().split('T')[0]);
                }
                break;
            default:
                dates.push(startDate);
                break;
        }

        return dates;
    };

    const handleSave = () => {
        if (selectedDate) {
            if (!selectedIndex.length) {
                Alert.alert('Error', 'You must select at least one exercise to save', [{ text: 'OK' }, { text: 'Cancel' }]);
                return;
            }
            const modeString = ExcerciseModes[mode.row];
            const dateRange = getDateRange(selectedDate, modeString);
            const newDates = new Map(dates);
            dateRange.forEach(date => {
                newDates.set(date, displayValues);
            });

            setDates(newDates);
            setSelectedDate(null);
            setSelectedIndex([]);
        }
    };

    const getMarkedDates = () => {
        const markedDates: any = {};
        dates.forEach((exercises, date) => {
            const dots = exercises.map(exercise => ({
                key: exercise,
                color: exerciseToColorMap[exercise],
                selectedDotColor: exerciseToColorMap[exercise],
            }));
            markedDates[date] = { dots };
        });
        return markedDates;
    };
    return (
        <View style={styles.container} >
            <CalendarComponent markedDates={getMarkedDates()}
                onDayPress={onDayPress}
            />

            <Modal
                visible={!!selectedDate}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedDate(null)}
            >
                <View style={styles.modalView}>
                    <Select
                        multiSelect
                        selectedIndex={selectedIndex}
                        value={displayValues.join(', ')}
                        onSelect={(index: any) => setSelectedIndex(index)}
                        style={styles.select}
                    >
                        {Excercises.map((exercise, index) => (
                            <SelectItem key={index} title={exercise} />
                        ))}
                    </Select>
                    <Select
                        selectedIndex={mode}
                        value={ExcerciseModes[mode.row]}
                        onSelect={(index: any) => setMode(index)}
                        style={styles.select}
                    >
                        {ExcerciseModes.map((mode, index) => (
                            <SelectItem key={index} title={mode} />
                        ))}
                    </Select>
                    <View style={styles.btnContainer}>
                        <Button title="Save" onPress={handleSave} />
                        <Button title="Cancel" onPress={() => setSelectedDate(null)} />
                    </View>
                </View>
            </Modal>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f7f9fc',
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
    select: {
        marginBottom: 16,
        width: '80%',
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 20,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    }
});

export default Goals;
