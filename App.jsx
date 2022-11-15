import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './AppNavigator';
import { theme } from './app/global';

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <AppNavigator />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({});
