import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Chip } from 'react-native-paper';
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
    function calculateBedTimes(date: Date) {
        let epochTimeNow = date.getTime() / 1000;
        for (let x = 0; x < 16; x++) {
            epochTimeNow -= 5400;
            console.log(`${x} - ${new Date(epochTimeNow * 1000)}`);
        }
    }

    return (
        <>
            <View>
                <TimePicker
                    customFunction={calculateBedTimes}
                    labelTitle="Enter Wake-Up Time"
                    buttonTitle="Calculate Bed Times"
                />
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}>
                    <Chip
                        mode="outlined"
                        style={{ marginTop: 10, backgroundColor: 'black' }}
                        textStyle={{ color: '#5ede9b' }}
                        onPress={() => console.log('Pressed')}>
                        Example Chip
                    </Chip>
                    <Chip
                        mode="outlined"
                        style={{ marginTop: 10, backgroundColor: 'black' }}
                        textStyle={{ color: '#5ede9b' }}
                        onPress={() => console.log('Pressed')}>
                        Example Chip
                    </Chip>
                    <Chip
                        mode="outlined"
                        style={{ marginTop: 10, backgroundColor: 'black' }}
                        textStyle={{ color: '#5ede9b' }}
                        onPress={() => console.log('Pressed')}>
                        Example Chip
                    </Chip>
                    <Chip
                        mode="outlined"
                        style={{ marginTop: 10, backgroundColor: 'black' }}
                        textStyle={{ color: '#5ede9b' }}
                        onPress={() => console.log('Pressed')}>
                        Example Chip
                    </Chip>
                </View>
            </View>
        </>
    );
}
