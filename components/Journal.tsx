import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Provider, Portal, Modal, Title, TextInput, Button, List, Divider } from 'react-native-paper';

export default function Journal() {
    const [visible, setVisible] = React.useState(false);
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [journals, setJournals] = React.useState([]);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: '#e4e7eb', padding: 20 };

    return (
        <>
            <List.Section style={{ width: '100%', marginTop: '2%' }}>
                <List.Item
                    title="Journal #1"
                    description="Item description"
                    left={(props) => <List.Icon {...props} icon="book" />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    style={{ backgroundColor: 'white' }}
                />
                <Divider />
                <List.Item
                    title="Journal #2"
                    description="Item description"
                    left={(props) => <List.Icon {...props} icon="book" />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    style={{ backgroundColor: 'white' }}
                />
                <Divider />
                <List.Item
                    title="Journal #3"
                    description="Item description"
                    left={(props) => <List.Icon {...props} icon="book" />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    style={{ backgroundColor: 'white' }}
                />
                <Divider />
                <List.Item
                    title="Journal #4"
                    description="Item description"
                    left={(props) => <List.Icon {...props} icon="book" />}
                    right={(props) => <List.Icon {...props} icon="chevron-right" />}
                    style={{ backgroundColor: 'white' }}
                />
            </List.Section>
            <Provider>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Title style={{ textAlign: 'center' }}>Journal Input</Title>
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
                        <Button
                            mode="contained"
                            style={{ marginTop: '3%' }}
                            color="#651fff"
                            onPress={() => console.log('Pressed')}>
                            Submit
                        </Button>
                    </Modal>
                </Portal>
            </Provider>
            <FAB style={styles.fab} small={false} icon="plus" onPress={showModal} />
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
