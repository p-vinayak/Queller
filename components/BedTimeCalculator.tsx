import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TimePicker from './TimePicker';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5ede9b',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: 15,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default function BedTimeCalculator() {
    function custom(date: Date) {
        console.log(date.getTime());
    }
    return (
        <View>
            <Text style={styles.title}>Bed Time Calculator</Text>
            <TimePicker customFunction={custom} />
        </View>
    );
}
