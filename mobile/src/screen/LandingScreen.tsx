import React from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { landingPageString } from "../strings/stringsPt"

const screenWidth = Dimensions.get('screen').width

const logo = require('../images/logo.png')
// const logo = require('../images/delivery_icon.png')

export const LandingScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.navigation} />

            <View style={styles.body}>
                <Image source={logo} style={styles.deliveryIcon} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>{landingPageString}</Text>
                </View>
                <Text style={styles.addressText}>Esperando pela localização atual</Text>
            </View>
            <View style={styles.footer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 2
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',

    },
    txt: {
        color: 'black',
    },
    addressContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    addressTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#7D7D7D',
    },
    addressText: {
        fontSize: 18,
        fontWeight: '200',
        color: '#4f4f4f',
        top: 10,
    },
    deliveryIcon: {
        width: 120,
        height: 120,
    },
    footer: {
        flex: 1,
    },

})