import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { ProgressModes } from '../utils/dummyData';
import PieChartComponent from '../components/PieChart';
import BarChartComponent from '../components/BarChart';
import { Colors } from '../styles';

const Progress = () => {
    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0));
    const displayValue = ProgressModes[selectedIndex.row];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>
                    <Select
                        selectedIndex={selectedIndex}
                        value={displayValue}
                        onSelect={(index: any) => setSelectedIndex(index)}
                    >
                        {ProgressModes.map((mode, index) => (
                            <SelectItem key={index} title={mode} />
                        ))}
                    </Select>
                    <Text style={styles.chartTitle}>Keep track of your progress</Text>
                    <PieChartComponent />

                    <Text style={styles.chartTitle}>Deep analysis of your habits</Text>
                    <BarChartComponent />
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    select: {
        marginBottom: 16,
        width: '80%',
    },
    chartTitle: {
        marginTop: 20,
        marginBottom: 10,
        fontSize: 20,
        color: Colors.Text.Basic,
        textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.BackGround.Light,
    },
    scrollContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
})

export default Progress