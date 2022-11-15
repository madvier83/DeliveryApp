import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Appbar, Button, Card, Paragraph, Title} from 'react-native-paper';
import numeral from 'numeral';

export default function HistoryDetailsScreen({route, navigation}) {
    const {_id, cityA, cityB, ongkir, distance, detail, weight} = route.params;
    return (
        <SafeAreaView>
            <Appbar>
                <Appbar.Content title="Details" />
                <Appbar.BackAction
                    onPress={() => navigation.navigate('History')}
                />
            </Appbar>
            <Card>
                <Card.Title
                    title={`${cityA} - ${cityB}`}
                    subtitle={`Rp.${numeral(ongkir).format('0,0')}`}
                />
                <Card.Content>
                    <Title>Alamat</Title>
                    <Paragraph>{`${detail}`}</Paragraph>
                    <Title>Barang</Title>
                    <Paragraph>{`Berat: ${weight}Kg`}</Paragraph>
                    <Paragraph>{`Jarak: ${distance}Km`}</Paragraph>
                </Card.Content>
                {/* <Card.Actions>
                    <Button onPress={()=>navigation.navigate("History")}>Back</Button>
                </Card.Actions> */}
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({});
