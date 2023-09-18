import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const CartScreen = () => {
    return (
        <View>
            <Text>CartSCreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'green'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'green'
    },

})