import React from 'react';
import {useState, useEffect} from 'react';
import {
    LogBox,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {ActivityIndicator, Appbar, Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';

import cities from '../../cities.json';
import driver from '../../users.json';
import global from '../global';

export default function HomeScreen({navigation}) {
    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);

    const [weight, setWeight] = useState(1);
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const [cityA, setCityA] = useState(null);
    const [cityB, setCityB] = useState(null);
    const [distance, setDistance] = useState(null);

    const [histories, setHistories] = useState([]);

    // measure distance
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
    function getDistance(lat1, lng1, lat2, lng2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1); // deg2rad below
        var dLng = deg2rad(lng2 - lng1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) *
                Math.cos(deg2rad(lat2)) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = Math.round(R * c * 10) / 10; // Distance in km
        return d;
    }

    // reset form paket
    function reset() {
        setWeight(1);
        setDetail(null);
        setCityA(null);
        setCityB(null);
        setDistance(null);
    }

    async function historyInit() {
        var prevHistories = await AsyncStorage.getItem('@histories');
        if (prevHistories) {
            prevHistories = JSON.parse(prevHistories);
            setHistories(prevHistories);
        } else {
            await AsyncStorage.setItem('@histories', JSON.stringify([]));
            setHistories([]);
        }
    }
    useEffect(() => {
        historyInit();
    }, []);

    // async function orderDriver() {
    //     const data = {
    //         // _id: uuid.v4(),
    //         cityA: cityA,
    //         cityB: cityB,
    //         detail: detail,
    //         weight: weight,
    //         distance: distance,
    //         ongkir: weight * distance * 100,
    //     };
    //     console.log(data);
    // }

    async function submitFormLocal() {
        if (cityA && cityB && detail) {
            setLoading(true);
            let city1 = cities.data.find(obj => obj.id === cityA);
            let city2 = cities.data.find(obj => obj.id === cityB);

            let distance_ = getDistance(
                city1.lat,
                city1.lng,
                city2.lat,
                city2.lng,
            );
            setDistance(distance_);

            const data = {
                _id: Math.random().toString(16).slice(2),
                cityA: cityA,
                cityB: cityB,
                detail: detail,
                weight: weight,
                distance: distance_,
                ongkir: weight * distance_ * 100,
                driver: driver.data[Math.floor(Math.random()*driver.data.length)]
            };
            
            let newHistories = histories;
            newHistories.unshift(data);
            
            newHistories = JSON.stringify(newHistories);
            console.log(newHistories);
            await AsyncStorage.setItem('@histories', newHistories);
            console.log(await AsyncStorage.getItem('@histories'));

            setTimeout(function () {
                reset();
                historyInit();
                setLoading(false);
                navigation.navigate('History');
            }, 2000);
        }
    }

    // debuger
    async function getAllLocalData() {
        AsyncStorage.clear();
    }
    async function logger() {
        // AsyncStorage.clear()
        // const keys = await AsyncStorage.getAllKeys();
        // const result = await AsyncStorage.multiGet(keys);
        // console.log('All :');
        // console.log(result);
        // historyInit()
        // console.log(driver.data[Math.floor(Math.random()*driver.data.length)])
    }

    // check distance when value changes
    // useEffect(() => {
    //     if (cityA && cityB) {
    //         setDistance(getDistance(cityA[1], cityA[2], cityB[1], cityB[2]));
    //         // console.log(getDistance(lat_a, lng_a, lat_b, lng_b));
    //     }
    // }, [cityA, cityB]);

    // let cityList = cities.data.map(obj => {
    //     return {
    //         ...obj,
    //         label: obj.city,
    //         value: [obj.city, obj.lat, obj.lng],
    //         // value: [obj.city, obj.lat, obj.lng],
    //     };
    // });

    return (
        <SafeAreaView>
            <Appbar>
                <Appbar.Content title="Delivery App" />
                <Appbar.Action />
            </Appbar>
            <TextInput
                style={global.ms}
                label="Berat (kg)"
                value={weight}
                defaultValue='1'
                mode="outlined"
                keyboardType="number-pad"
                onChangeText={text => setWeight(text)}></TextInput>
            <View style={styles.citySelectStyle}>
                <DropDownPicker
                    style={[global.ms, styles.cityDropdown]}
                    dropDownContainerStyle={[global.ms, styles.cityDropdown]}
                    schema={{
                        label: 'city',
                        value: 'id',
                    }}
                    mode="SIMPLE"
                    open={openA}
                    setOpen={setOpenA}
                    value={cityA}
                    setValue={setCityA}
                    items={cities.data}
                    searchable={true}
                    listMode="SCROLLVIEW"
                />
                <DropDownPicker
                    style={[global.ms, styles.cityDropdown]}
                    dropDownContainerStyle={[global.ms, styles.cityDropdown]}
                    schema={{
                        label: 'city',
                        value: 'id',
                    }}
                    mode="SIMPLE"
                    open={openB}
                    setOpen={setOpenB}
                    value={cityB}
                    setValue={setCityB}
                    items={cities.data}
                    searchable={true}
                    listMode="SCROLLVIEW"
                />
            </View>
            <TextInput
                style={global.ms}
                value={detail}
                label="Detail Alamat"
                mode="outlined"
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setDetail(text)}></TextInput>
            {loading ? (
                <ActivityIndicator animating={true} size={36} style={global.ml} />
            ) : (
                <Button
                    style={global.ms}
                    mode="contained"
                    onPress={submitFormLocal}>
                    Cari Driver
                </Button>
            )}
            <Button
                style={global.ms}
                mode="contained-tonal"
                onPress={reset}>
                Reset
            </Button>
            <Button
                style={global.ms}
                mode="contained-tonal"
                onPress={() => navigation.navigate('History')}>
                History
            </Button>
            <Button
                style={[global.ms, {marginTop: 16}]}
                mode="text"
                onPress={logger}>
                Dev Log
            </Button>
            <Button
                style={global.ms}
                mode="text"
                onPress={() => navigation.navigate('Login')}>
                Logout
            </Button>

            {/* <BottomNavigation1 /> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    citySelectStyle: {
        display: 'flex',
        flexDirection: 'row',
        width: '49.5%',
        marginTop: 4,
    },
    cityDropdown: {
        borderRadius: 4,
        width: '98%',
        borderColor: 'gray',
    },
});
