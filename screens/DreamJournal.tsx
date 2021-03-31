import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Journal from '../components/Journal';

export default function DreamJournal() {
    return <View style={styles.container}>
        <Journal/>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
