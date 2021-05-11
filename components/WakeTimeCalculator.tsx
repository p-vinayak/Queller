import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Chip } from 'react-native-paper';
import TimePicker from './TimePicker';

export default function WakeTimeCalculator() {
    const [wakeUpTimes, setWakeUpTimes] = React.useState(Array<Date>()); // Calculated REM Wake Up Times

    // Calculate all possible wake up times based on provided bed time.
    function calculateWakeUpTimes(date: Date) {
        const calculatedWakeUpTimes = [];
        const currentDate = date;
        for (let x = 0; x < 16; x++) {
            currentDate.setHours(currentDate.getHours() + 1);
            currentDate.setMinutes(currentDate.getMinutes() + 30);
            calculatedWakeUpTimes.push(new Date(+currentDate));
        }
        setWakeUpTimes(calculatedWakeUpTimes);
    }

    return (
        <>
            <View>
                <TimePicker
                    customFunction={calculateWakeUpTimes}
                    labelTitle="Enter Bed Time"
                    buttonTitle="Calculate Wake-Up Times"
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
                {wakeUpTimes.map((wakeUpTime, index) => {
                    return (
                        <Chip
                            key={index}
                            mode="outlined"
                            style={{ marginTop: 10, backgroundColor: 'black' }}
                            textStyle={{ color: '#5ede9b' }}>
                            {wakeUpTime.toLocaleTimeString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                            })}
                        </Chip>
                    );
                })}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#323f4b',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: 15,
    },
    subTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'left',
        paddingTop: 15,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
