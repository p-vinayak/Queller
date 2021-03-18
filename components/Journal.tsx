import React from 'react';
import { Button, StyleSheet, Modal, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Journal() {
    const [showModal, setShowModal] = React.useState(false);
    const [text, setText] = React.useState('Sample Dream');

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={showModal}
                    onRequestClose={() => {
                        console.log('Modal closed');
                    }}>
                    <View style={styles.modal}>
                        <Text style={styles.text}>Dream Journal</Text>
                        <TextInput
                            onChangeText={(text) => setText(text)}
                            placeholder="Type Dream Details Here"
                            style={styles.input}
                        />
                        <Button
                            title="Click to close"
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        />
                    </View>
                </Modal>
                <Button
                    title="Add Dream"
                    onPress={() => {
                        setShowModal(!showModal);
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 30,
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightblue',
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
});
