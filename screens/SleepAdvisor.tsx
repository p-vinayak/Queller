import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import BedTimeCalculator from '../components/BedTimeCalculator';
import WakeTimeCalculator from '../components/WakeTimeCalculator';
import { Avatar, Button, Card, Title, Paragraph, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#24292e',
        borderRadius: 15,
        margin: '3%',
    },
    title: {
        textAlign: 'center',
    },
    separator: {
        color: '#5ede9b',
    },
});

export default function SleepAdvisor() {
    return (
        <>
            <Card style={styles.container}>
                <Card.Title title="Bed Time Calculator" titleStyle={{ color: '#e4e7eb' }} />
                <Card.Content>
                    <BedTimeCalculator />
                </Card.Content>
            </Card>
            <Card style={styles.container}>
                <Card.Title title="Wake-Up Time Calculator" titleStyle={{ color: '#e4e7eb' }} />
                <Card.Content>
                    <WakeTimeCalculator />
                </Card.Content>
            </Card>
        </>
    );
}
