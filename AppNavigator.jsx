import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Home from './app/screens/Home.screen';
// import Next from './app/screens/Next.screen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import HistoryScreen from './app/screens/HistoryScreen';
import HistoryDetailsScreen from './app/screens/HistoryDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
                <Stack.Screen name="HistoryDetails" component={HistoryDetailsScreen} />
                {/* <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Next" component={Next} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({});
