import * as React from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Button, Text, Title, Subheading } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

interface TimePickerProps {
    customFunction: (date: Date) => void;
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
});

export default function TimePicker({ customFunction, buttonTitle, labelTitle }: TimePickerProps) {
    const [date, setDate] = React.useState(new Date());
    const [show, setShow] = React.useState(Platform.OS === 'ios');

    function onTimeChange(event: any, selectedDate?: Date | undefined) {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate || date);
    }

    return (
        <View>
            <View style={{ flexDirection: 'row' }}>
                <Subheading style={{ color: '#e4e7eb' }}>{labelTitle}: </Subheading>
                <Text>
                    {Platform.OS !== 'ios' && (
                        <Button mode="outlined" style={{ marginLeft: 20 }} onPress={() => setShow(true)}>
                            Show Time Picker
                        </Button>
                    )}
                    {show && (
                        <DateTimePicker
                            value={date}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onTimeChange}
                            style={{ width: 140 }}
                        />
                    )}
                </Text>
            </View>
            {!show && <Subheading>Selected Time: {date.toLocaleTimeString()}</Subheading>}
            <Button mode="contained" onPress={() => customFunction(date)} style={{ marginTop: 10 }} color="#651fff">
                {buttonTitle}
            </Button>
        </View>
    );
}
