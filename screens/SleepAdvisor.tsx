import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import TimePicker from '../components/TimePicker';

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
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default function SleepAdvisor() {
    return (
        <View>
            <TimePicker />
        </View>
    );
}
