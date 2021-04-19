import * as React from 'react';
import { Platform, View, Text, StyleSheet, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
    customFunction: (date: Date) => void; // Continue Here
}

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
    subTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});

export default function TimePicker({ customFunction }: TimePickerProps) {
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(Platform.OS === 'ios');

    function onTimeChange(event: any, selectedDate?: Date | undefined) {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate || date);
        customFunction(date);
    }

    return (
        <View>
            {!show && <Text>{date.toLocaleTimeString()}</Text>}
            <Text>
                <Text style={styles.subTitle}>Enter Wake-Up Time: </Text>
                {show && (
                    <Text>
                        <DateTimePicker
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                            style={{ width: 140, marginLeft: 45 }}
                        />
                    </Text>
                )}
            </Text>
            <Button title="Calculate Bed Times" onPress={() => console.log('eh')}></Button>
        </View>
    );
}
