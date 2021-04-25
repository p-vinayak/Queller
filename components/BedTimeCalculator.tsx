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
    const [bedTimes, setBedTimes] = React.useState(Array<Date>());

    function calculateBedTimes(date: Date) {
        const calculatedBedTimes = [];
        const currentDate = date;
        for (let x = 0; x < 16; x++) {
            currentDate.setHours(currentDate.getHours() - 1);
            currentDate.setMinutes(currentDate.getMinutes() - 30);
            calculatedBedTimes.push(new Date(+currentDate));
        }
        setBedTimes(calculatedBedTimes);
    }

    return (
        <>
            <View>
                <TimePicker
                    customFunction={calculateBedTimes}
                    labelTitle="Enter Wake-Up Time"
                    buttonTitle="Calculate Bed Times"
                />
            </View>
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}>
                {bedTimes.map((bedTime, index) => {
                    return (
                        <Chip
                            key={index}
                            mode="outlined"
                            style={{ marginTop: 10, backgroundColor: 'black' }}
                            textStyle={{ color: '#5ede9b' }}
                            onPress={() => console.log('Pressed')}>
                            {bedTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
                        </Chip>
                    );
                })}
            </View>
        </>
    );
}
