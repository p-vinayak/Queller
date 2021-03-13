import * as React from 'react';
import { Platform, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

type TimePickerProps = {};

export default function TimePicker({}: TimePickerProps) {
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [show, setShow] = React.useState(Platform.OS === 'ios');

    function onChange(event: any, selectedDate?: Date | undefined) {
        setShow(Platform.OS === 'ios');
        setDate(selectedDate || date);
    }

    return (
        <View>
            {!show && <Text>{date.toLocaleTimeString()}</Text>}
            {show && (
                <DateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    style={{ width: 140, marginLeft: 45 }}
                />
            )}
        </View>
    );
}
