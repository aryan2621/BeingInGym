import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const barData = [
    { value: 40, label: 'Jan', spacing: 2, labelWidth: 30, labelTextStyle: { color: 'gray' }, frontColor: '#177AD5' },
    { value: 20, frontColor: '#ED6665' },
    { value: 50, label: 'Feb', spacing: 2, labelWidth: 30, labelTextStyle: { color: 'gray' }, frontColor: '#177AD5' },
    { value: 40, frontColor: '#ED6665' },
    { value: 75, label: 'Mar', spacing: 2, labelWidth: 30, labelTextStyle: { color: 'gray' }, frontColor: '#177AD5' },
    { value: 25, frontColor: '#ED6665' },
    { value: 30, label: 'Apr', spacing: 2, labelWidth: 30, labelTextStyle: { color: 'gray' }, frontColor: '#177AD5' },
    { value: 20, frontColor: '#ED6665' },
    { value: 60, label: 'May', spacing: 2, labelWidth: 30, labelTextStyle: { color: 'gray' }, frontColor: '#177AD5' },
    { value: 40, frontColor: '#ED6665' },
    { value: 65, label: 'Jun', spacing: 2, labelWidth: 30, labelTextStyle: { color: 'gray' }, frontColor: '#177AD5' },
    { value: 30, frontColor: '#ED6665' },
];

const BarChartComponent = () => {
    const renderTitle = () => {
        return (
            <View style={{ marginVertical: 30 }}>
                <View style={styles.legendItem}>
                    <View style={dotStyle('#177AD5')} />
                    <Text style={styles.legendLabel}>Point 01</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={dotStyle('#ED6665')} />
                    <Text style={styles.legendLabel}>Point 02</Text>
                </View>
            </View>
        );
    };

    const dotStyle = (color: string) => ({
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: color,
        marginRight: 8,
    });

    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            {renderTitle()}
            <BarChart
                data={barData}
                barWidth={8}
                spacing={24}
                roundedTop
                roundedBottom
                hideRules
                xAxisThickness={0}
                yAxisThickness={0}
                yAxisTextStyle={{ color: 'gray' }}
                noOfSections={3}
                maxValue={75}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendLabel: {
        width: 60,
        height: 16,
        color: 'lightgray',
    },
});

export default BarChartComponent;
