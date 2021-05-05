import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
    FAB,
    Provider,
    Portal,
    Modal,
    Title,
    TextInput,
    Button,
    List,
    Divider,
    Snackbar,
    Text,
} from 'react-native-paper';
import * as firebase from 'firebase';
import 'firebase/firestore';

interface Journal {
    title: string;
    description: string;
    id: string;
    createdAt: number;
}

export default function Journal() {
    const [visible, setVisible] = React.useState(false);
    const [visibleSnack, setVisibleSnack] = React.useState(false);
    const [visibleDetails, setVisibleDetails] = React.useState(false);

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [detailsTitle, setDetailsTitle] = React.useState('');
    const [detailsDescription, setDetailsDescription] = React.useState('');
    const [detailsId, setDetailsId] = React.useState('');

    const [journals, setJournals] = React.useState(new Array<Journal>());
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const showDetails = (title: string, description: string, id: string) => {
        setDetailsTitle(title);
        setDetailsDescription(description);
        setDetailsId(id);
        setVisibleDetails(true);
    };
    const hideDetails = () => setVisibleDetails(false);
    const showError = () => setVisibleSnack(true);
    const dismissError = () => setVisibleSnack(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };
    const db = firebase.firestore();

    React.useEffect(() => {
        getJournals();
    }, []);

    async function validateInput() {
        if (title === '' || description === '') showError();
        else {
            setVisible(false);
            await createJournal();
        }
    }

    async function createJournal() {
        await db.collection('journals').doc().set({
            title: title,
            description: description,
            createdAt: new Date().getTime(),
        });
        await getJournals();
    }

    async function getJournals() {
        console.log('getting', new Date());
        const journalsArray: Journal[] = [];
        await (await db.collection('journals').get()).forEach((doc) => {
            const { title, description, createdAt } = doc.data();
            const id = doc.id;
            journalsArray.push({ title: title, description: description, id: id, createdAt: createdAt });
        });
        journalsArray.sort((a, b) => {
            if (a.createdAt > b.createdAt) return 1;
            if (b.createdAt > a.createdAt) return -1;
            return 0;
        });
        setJournals(journalsArray);
    }

    async function deleteJournal(journalId: string) {
        await db.collection('journals').doc(journalId).delete();
        await getJournals();
        hideDetails();
    }

    return (
        <>
            <ScrollView style={{ width: '100%' }}>
                <List.Section style={{ width: '100%', marginTop: '2%' }}>
                    {journals.map((journal) => {
                        const { title, description, id } = journal;
                        return (
                            <React.Fragment key={id}>
                                <List.Item
                                    title={title}
                                    description={description}
                                    left={(props) => <List.Icon {...props} icon="book" color="black" />}
                                    right={(props) => <List.Icon {...props} icon="chevron-right" color="black" />}
                                    style={{ backgroundColor: 'white' }}
                                    titleStyle={{ color: 'black' }}
                                    descriptionStyle={{ color: 'black' }}
                                    descriptionNumberOfLines={2}
                                    titleNumberOfLines={1}
                                    onPress={() => showDetails(title, description, id)}
                                />
                                <Divider />
                            </React.Fragment>
                        );
                    })}
                </List.Section>
            </ScrollView>
            <Provider>
                <Portal>
                    <Modal visible={visibleDetails} onDismiss={hideDetails} contentContainerStyle={containerStyle}>
                        <Title style={{ textAlign: 'center', color: 'black' }}>{detailsTitle}</Title>
                        <Text style={{ textAlign: 'center', color: 'black' }}>{detailsDescription}</Text>
                        <Button
                            mode="contained"
                            style={{ marginTop: '3%' }}
                            color="red"
                            onPress={() => deleteJournal(detailsId)}>
                            Delete
                        </Button>
                    </Modal>
                </Portal>
            </Provider>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Title style={{ textAlign: 'center', color: 'black' }}>Journal Input</Title>
                        <TextInput
                            label="Journal Title"
                            value={title}
                            onChangeText={(text) => setTitle(text)}
                            style={{ marginTop: '2%' }}
                            mode="outlined"
                            dense={true}
                        />
                        <TextInput
                            label="Journal Description"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            style={{ marginTop: '2%' }}
                            mode="outlined"
                            multiline={true}
                        />
                        <Button mode="contained" style={{ marginTop: '3%' }} color="#651fff" onPress={validateInput}>
                            Submit
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
                Error: Please enter a title and a description!
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
