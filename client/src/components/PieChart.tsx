// PieChartComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const pieData = [
    { value: 30, color: '#FFA177', gradientCenterColor: '#FFA177', label: 'Cardio', focused: true },
    { value: 20, color: '#FFCC87', gradientCenterColor: '#FFCC80', label: 'Legs' },
    { value: 10, color: '#FFA177', gradientCenterColor: '#FFA177', label: 'Arms' },
    { value: 15, color: '#FFCC80', gradientCenterColor: '#FFCC80', label: 'Back' },
];

const PieChartComponent = () => {
    const renderDot = (color: string) => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        const legendItems = pieData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
                {renderDot(item.color)}
                <Text style={{ color: 'black' }}>{`${item.label}: ${item.value}%`}</Text>
            </View>
        ));

        const rows = [];
        for (let i = 0; i < legendItems.length; i += 2) {
            rows.push(
                <View key={i} style={styles.legendRow}>
                    {legendItems[i]}
                    {legendItems[i + 1] ? legendItems[i + 1] : <View style={styles.legendItem} />}
                </View>
            );
        }
        return <>{rows}</>;
    };

    return (
        <View style={{ padding: 20, alignItems: 'center' }}>
            <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={'#232B5D'}
                centerLabelComponent={() => {
                    const maxItem = pieData.reduce((prev, current) =>
                        prev.value > current.value ? prev : current
                    );
                    return (
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                                style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                {maxItem.value}%
                            </Text>
                            <Text style={{ fontSize: 14, color: 'white' }}>
                                {maxItem.label}
                            </Text>
                        </View>
                    );
                }}
            />
            {renderLegendComponent()}
        </View>
    );
};

const styles = StyleSheet.create({
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        marginRight: 20,
    },
});

export default PieChartComponent;
