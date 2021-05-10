import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { firebaseConfig } from './configs/firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export default function App() {
    const isLoadingComplete = useCachedResources();
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <PaperProvider>
                <SafeAreaProvider>
                    <Navigation colorScheme="dark" />
                    <StatusBar />
                </SafeAreaProvider>
            </PaperProvider>
        );
    }
}
