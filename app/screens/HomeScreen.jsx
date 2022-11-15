import {
    LogBox,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React from 'react';
import {Appbar, Button, TextInput} from 'react-native-paper';
// import DropDown from 'react-native-paper-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import cities from '../../cities.json';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { v4 as uuid } from 'uuid';

import global from '../global';
import BottomNavigation1 from '../components/BottomNavigation1';

export default function HomeScreen({navigation}) {
    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);

    const [weight, setWeight] = useState(1);
    const [detail, setDetail] = useState(null);
    const [loading, setLoading] = useState(false);

    const [cityA, setCityA] = useState(null);
    const [cityB, setCityB] = useState(null);
    const [lat_a, setLat_a] = useState(null);
    const [lng_a, setLng_a] = useState(null);
    const [lat_b, setLat_b] = useState(null);
    const [lng_b, setLng_b] = useState(null);
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
        setDetail('');
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
            // setLoading(true);
            let city1 = cities.data.find(obj => obj.id === cityA)
            let city2 = cities.data.find(obj => obj.id === cityB)
            
            let distance_ = getDistance(city1.lat, city1.lng, city2.lat, city2.lng)
            setDistance(distance_);
            // console.log(city1.lat)
            // console.log(city2)

            const data = {
                _id: Math.random().toString(16).slice(2),
                cityA: cityA,
                cityB: cityB,
                detail: detail,
                weight: weight,
                distance: distance_,
                ongkir: weight * distance_ * 100,
            };
            // console.log(data)
            let newHistories = histories;
            newHistories.unshift(data);

            newHistories = JSON.stringify(newHistories);
            console.log(newHistories);
            await AsyncStorage.setItem('@histories', newHistories);
            console.log(await AsyncStorage.getItem('@histories'));

            reset();
            historyInit();
            navigation.navigate("History")
            // setLoading(false);
        }
    }

    // debuger
    async function getAllLocalData() {
        AsyncStorage.clear();
    }
    async function logger() {
        const keys = await AsyncStorage.getAllKeys();
        const result = await AsyncStorage.multiGet(keys);
        console.log('All :');
        console.log(result);
        // historyInit()
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
                defaultValue="1"
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
                label="Detail Alamat"
                mode="outlined"
                multiline={true}
                numberOfLines={4}
                onChangeText={text => setDetail(text)}></TextInput>
            <Button style={global.ms} mode="contained" onPress={submitFormLocal}>
                Cari Driver
            </Button>
            <Button style={global.ms} mode="contained-tonal" onPress={()=>navigation.navigate("History")}>
                History
            </Button>
            <Button style={[global.ms, {marginTop: 16}]} mode="text" onPress={logger}>
                Dev Log
            </Button>
            <Button style={global.ms} mode="text" onPress={()=>navigation.navigate("Login")}>
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
