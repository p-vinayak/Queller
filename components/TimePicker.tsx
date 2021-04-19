import * as React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
    customFunction: (date: Date) => void; // Continue Here
    buttonTitle: string;
    labelTitle: string;
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
        color: '#000000',
    },
    picker: {
        textAlign: 'center',
    },
});

export default function TimePicker({ customFunction, buttonTitle, labelTitle }: TimePickerProps) {
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
                <Text style={styles.subTitle}>{labelTitle}: </Text>
                {show && (
                    <Text style={styles.picker}>
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
            <Button mode="contained" onPress={() => console.log('Pressed')}>
                {buttonTitle}
            </Button>
        </View>
    );
}
