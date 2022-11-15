import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Appbar, List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cities from '../../cities.json';
import numeral from 'numeral';

export default function HistoryScreen({navigation}) {
    const [histories, setHistories] = useState([]);

    async function historyInit() {
        const prevHistory = await AsyncStorage.getItem('@histories');
        if (prevHistory) {
            setHistories(JSON.parse(prevHistory));
        }
        // console.log(prevHistory);
    }
    
    // useEffect anomali
    historyInit();

    useEffect(() => {
        historyInit();
    }, [navigation]);

    const cityList = cities.data;

    return (
        <View>
            <Appbar>
                <Appbar.Content title="History" />
                <Appbar.BackAction
                    onPress={() => navigation.navigate('Home')}
                />
            </Appbar>
            <View>
                {histories?.map(obj => (
                    <List.Item
                        // title={`${cityList.find(city => city.id == obj.cityA,).city}' - '${cityList.find(city => city.id == obj.cityB,).city}`}
                        key={obj._id}
                        title={`${
                            cityList.find(city => city.id == obj.cityA).city
                        } - ${
                            cityList.find(city => city.id == obj.cityB).city
                        } Rp.${numeral(obj.ongkir).format("0,0")}`}
                        description={`${obj.distance} Km / ${obj.detail}`}
                        left={props => (
                            <List.Icon {...props} icon="archive" />
                        )}
                        onPress={()=>navigation.navigate("HistoryDetails", {
                            _id: obj._id,
                            ongkir: obj.ongkir,
                            distance: obj.distance,
                            weight: obj.weight,
                            cityA: cityList.find(city => city.id == obj.cityA).city,
                            cityB: cityList.find(city => city.id == obj.cityB).city,
                            detail: obj.detail
                        })}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({});
