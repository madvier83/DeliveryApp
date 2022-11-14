import React from 'react';
import {StyleSheet, SafeAreaView, Text, View, Alert} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

export default function LoginScreen({navigation}) {
    function login() {
        // return Alert.alert("Login");
        navigation.navigate("Home")
    }
    return (
        <SafeAreaView style={styles.content}>
            <View style={styles.loginCard}>
                <Card>
                    <Card.Title
                        title="Delivery App"
                        titleStyle={styles.loginTitle}
                    />
                    <Card.Content>
                        <TextInput
                            label="Email"
                            keyboardType="email-address"
                            style={styles.my4}></TextInput>
                        <TextInput
                            label="Password"
                            secureTextEntry={true}
                            style={styles.my4}></TextInput>
                        <Button uppercase={false} style={styles.my4}>
                            <Text>Forgot Email/Password</Text>
                        </Button>
                        <Button onPress={login} mode="contained" style={styles.my4}>
                            Login
                        </Button>
                        <Button style={styles.my4} onPress={()=>navigation.navigate("Register")}>Register</Button>
                    </Card.Content>
                </Card>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        // backgroundColor: theme.colors.onPrimaryContainer,
    },
    loginCard: {
        width: '80%',
    },
    loginTitle: {
        fontSize: 32,
        paddingTop: 32,
        paddingVertical: 16,
    },
    my4: {
        marginVertical: 4,
    },
});
