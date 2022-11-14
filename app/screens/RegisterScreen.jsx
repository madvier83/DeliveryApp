import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Appbar, Button, TextInput } from 'react-native-paper';
import global from '../global';

export default function RegisterScreen({navigation}) {
    return (
        <View>
            <Appbar>
                <Appbar.Content title="Register"/>
                <Appbar.BackAction onPress={() => navigation.goBack()}/>
            </Appbar>
            <View style={global.ml}>
                <TextInput style={global.ml} label="Username"></TextInput>
                <TextInput style={global.ml} label="Email"></TextInput>
                <TextInput style={global.ml} label="Password"></TextInput>
                <TextInput style={global.ml} label="Confirm Password"></TextInput>
                <Button style={global.ml} mode='contained'>Create Account</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
