import * as React from 'react';
import { StyleSheet, Button, Platform, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    const [date, setDate] = React.useState(new Date(1598051730000));
    const [bedtime, setBedtime] = React.useState(new Date(1598051730000));
    const [show, setShow] = React.useState(Platform.OS === 'ios');

    function onChange(event: any, selectedDate?: Date | undefined) {
        setShow(Platform.OS === 'ios');
        console.log(selectedDate?.toLocaleTimeString());
        setDate(selectedDate || date);
    }

    return (
        <View style={styles.container}>
            <Text>{date.toLocaleTimeString()}</Text>
            {!(Platform.OS === 'ios') && <Button onPress={() => setShow(true)} title="Pick Bedtime"></Button>}
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
