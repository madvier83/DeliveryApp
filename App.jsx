import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './AppNavigator';

export default function App() {
    return (
        <PaperProvider>
            <AppNavigator />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({});
