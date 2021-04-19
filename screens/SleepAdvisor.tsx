import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BedTimeCalculator from '../components/BedTimeCalculator';
import WakeTimeCalculator from '../components/WakeTimeCalculator';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#6d6875',
        borderRadius: 15,
        margin: '5%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default function SleepAdvisor() {
    return (
        <>
            <View style={styles.container}>
                <WakeTimeCalculator />
            </View>
            <View style={styles.container}>
                <BedTimeCalculator />
            </View>
        </>
    );
}
