import {StyleSheet, View} from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import React from 'react';

export default function Next({navigation}) {
    return (
        <View>
            <Appbar>
                <Appbar.Content title="Next"/>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
            </Appbar>
            <Text>Next</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
