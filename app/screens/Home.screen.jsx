import {Alert, StyleSheet, View} from 'react-native';
import {Text, TextInput, Button, Appbar} from 'react-native-paper';
import global from '../global';
import React from 'react';

export default function Home({navigation}) {
    function nextScreen() {
        // return Alert.alert("Test")
        navigation.navigate('Next');
    }
    return (
        <View>
            <Appbar>
                <Appbar.Content title="Home" />
            </Appbar>
            <View style={global.ml}>
                <Button mode="contained" onPress={nextScreen} style={global.ms}>
                    Next Page
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    style={global.ms}>
                    Logout
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
