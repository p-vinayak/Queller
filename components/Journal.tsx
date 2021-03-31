import React from 'react';
import { Button, StyleSheet, Modal, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Journal() {
   
    const [showModal, setShowModal] = React.useState(false);
    const [description, setDescription] = React.useState('');
    const [title, setTitle] = React.useState('');
    
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
                            placeholder='Enter Dream Title Here'
                            onChangeText={(newTitle) => setTitle(newTitle)}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder='Enter Dream Details Here'
                            onChangeText={(newDescription) => setDescription(newDescription)}
                            style={styles.input2}
                            multiline = {true}
                            numberOfLines = {10}
                        />
                        <Button
                            title='Press to close'
                            onPress={() => {
                                setShowModal(!showModal);
                            }}
                        />
                    </View>
                </Modal>
                <Button
                    title='Add Dream'
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
