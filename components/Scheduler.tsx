import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import {
    FAB,
    Provider,
    Portal,
    Modal,
    Title,
    Chip,
    TextInput,
    Button,
    List,
    Divider,
    Snackbar,
    Text,
} from 'react-native-paper';
import SchedulePicker from './SchedulePicker';
import * as firebase from 'firebase';
import 'firebase/firestore';

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type Days = {
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
    sunday: boolean;
};

interface Schedule {
    id: string;
    bedTime: number;
    wakeUpTime: number;
    days: Days;
}

export default function Schedule() {
    const [visible, setVisible] = React.useState(false);
    const [visibleSnack, setVisibleSnack] = React.useState(false);
    const [visibleDetails, setVisibleDetails] = React.useState(false);
    const [bedTime, setBedTime] = React.useState(new Date());
    const [wakeUpTime, setWakeUpTime] = React.useState(new Date());
    const [schedules, setSchedules] = React.useState(new Array<Schedule>());
    const [detailsBedTime, setDetailsBedTime] = React.useState(bedTime);
    const [detailsWakeUpTime, setDetailsWakeUpTime] = React.useState(wakeUpTime);
    const [detailsId, setDetailsId] = React.useState('');
    const [detailsTitle, setDetailsTitle] = React.useState('');
    const [selectedDays, setSelectedDays] = React.useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false,
    });
    const [detailsDays, setDetailsDays] = React.useState(selectedDays);

    const showDetails = (bedTime: Date, wakeUpTime: Date, days: Days, id: string, title: string) => {
        setDetailsBedTime(bedTime);
        setDetailsWakeUpTime(wakeUpTime);
        setDetailsDays(days);
        setDetailsTitle(title);
        setDetailsId(id);
        setVisibleDetails(true);
    };
    const hideDetails = () => setVisibleDetails(false);
    const showError = () => setVisibleSnack(true);
    const dismissError = () => setVisibleSnack(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const updateBedTime = (bedTime: Date) => setBedTime(bedTime);
    const updateWakeUpTime = (wakeUpTime: Date) => setWakeUpTime(wakeUpTime);

    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const db = firebase.firestore();

    React.useEffect(() => {
        getSchedules();
    }, []);

    async function validateInput() {
        for (const day in selectedDays) {
            if (selectedDays[day as Day] === true) {
                setVisible(false);
                createSchedule();
                return true;
            }
        }
        showError();
        return false;
    }

    async function getSchedules() {
        console.log('getting', new Date());
        const schedulesArray: Schedule[] = [];
        await (await db.collection('schedules').get()).forEach((doc) => {
            const { bedTime, wakeUpTime, days } = doc.data();
            const id = doc.id;
            schedulesArray.push({ bedTime: bedTime, wakeUpTime: wakeUpTime, days: days, id: id });
        });
        setSchedules(schedulesArray);
    }

    async function createSchedule() {
        await db.collection('schedules').doc().set({
            bedTime: bedTime.getTime(),
            wakeUpTime: wakeUpTime.getTime(),
            days: selectedDays,
        });
        await getSchedules();
    }

    async function deleteSchedule(scheduleId: string) {
        await db.collection('schedules').doc(scheduleId).delete();
        await getSchedules();
        hideDetails();
    }

    function makeDayString(days: Days) {
        let title = '';
        for (const day in days) {
            if (days[day as Day]) title = title.concat(day.charAt(0).toUpperCase() + day.slice(1) + ' ');
        }
        return title;
    }

    return (
        <>
            <ScrollView style={{ width: '100%' }}>
                <List.Section style={{ width: '100%', marginTop: '2%' }}>
                    {schedules.map((schedule, index) => {
                        const { bedTime, wakeUpTime, id, days } = schedule;
                        const title = `Schedule #${index + 1}`;
                        const description = `Bed Time - ${new Date(
                            bedTime,
                        ).toLocaleTimeString()}\nWake Up Time - ${new Date(wakeUpTime).toLocaleTimeString()}`;
                        return (
                            <React.Fragment key={id}>
                                <List.Item
                                    title={title}
                                    description={description}
                                    left={(props) => <List.Icon {...props} icon="clock" color="black" />}
                                    right={(props) => <List.Icon {...props} icon="chevron-right" color="black" />}
                                    style={{ backgroundColor: 'white' }}
                                    titleStyle={{ color: 'black' }}
                                    descriptionStyle={{ color: 'black' }}
                                    descriptionNumberOfLines={2}
                                    titleNumberOfLines={1}
                                    onPress={() =>
                                        showDetails(new Date(bedTime), new Date(wakeUpTime), days, id, title)
                                    }
                                />
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </List.Section>
            </ScrollView>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Title style={{ textAlign: 'center', color: 'black', marginBottom: '5%' }}>
                            Schedule Input
                        </Title>
                        <SchedulePicker
                            labelTitle="Enter Bed Time"
                            customFunction={updateBedTime}
                            defaultDate={bedTime}
                        />
                        <SchedulePicker
                            labelTitle="Enter Wake-Up Time"
                            customFunction={updateWakeUpTime}
                            defaultDate={wakeUpTime}
                        />
                        <View
                            style={{
                                marginTop: 15,
                                marginBottom: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}>
                            {Object.entries(selectedDays).map((entry) => {
                                let [day, selected] = entry;
                                return (
                                    <Chip
                                        key={day}
                                        style={{ marginLeft: 10 }}
                                        selected={selected}
                                        onPress={() => {
                                            const updatedDays = selectedDays;
                                            updatedDays[day as Day] = !selected;
                                            setSelectedDays({ ...updatedDays });
                                        }}>
                                        {day[0].toUpperCase()}
                                    </Chip>
                                );
                            })}
                        </View>
                        <Button mode="contained" style={{ marginTop: '3%' }} color="#651fff" onPress={validateInput}>
                            Submit
                        </Button>
                    </Modal>
                </Portal>
            </Provider>
            <Provider>
                <Portal>
                    <Modal visible={visibleDetails} onDismiss={hideDetails} contentContainerStyle={containerStyle}>
                        <Title style={{ textAlign: 'center', color: 'black', marginBottom: '5%' }}>
                            {detailsTitle}
                        </Title>
                        <Text>On Days - {makeDayString(detailsDays)}</Text>
                        <Text>Bed Time - {detailsBedTime.toLocaleTimeString()}</Text>
                        <Text>Wake Up - {detailsWakeUpTime.toLocaleTimeString()}</Text>
                        <Button
                            mode="contained"
                            style={{ marginTop: '3%' }}
                            color="red"
                            onPress={() => deleteSchedule(detailsId)}>
                            Delete
                        </Button>
                    </Modal>
                </Portal>
            </Provider>
            <FAB style={styles.fab} small={false} icon="plus" onPress={showModal} />
            <Snackbar
                visible={visibleSnack}
                onDismiss={dismissError}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        // Do something
                    },
                }}>
                Error: Please select atleast one scheduled day!
            </Snackbar>
        </>
    );
}

const styles = StyleSheet.create({
    fab: {
        backgroundColor: '#651fff',
        position: 'absolute',
        right: '43%',
        bottom: '4%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 30,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        padding: 100,
    },
    text: {
        fontSize: 20,
        color: '#3f2949',
        marginTop: 10,
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        width: 300,
    },
    input2: {
        borderColor: 'black',
        borderWidth: 1,
        height: 100,
        width: 300,
    },
});
