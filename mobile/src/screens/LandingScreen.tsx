import React, { useState, useReducer, useEffect } from "react"
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"
import { landingPageString, waitingForAddressString } from "../strings/stringsPt"
import { useNavigation } from "../utils"

import * as Location from 'expo-location'

import { onUpdateLocation, UserState, ApplicationState } from "../redux"
import { connect } from 'react-redux'

const logo = require('../images/logo.png')
const screenWidth = Dimensions.get('screen').width
// const logo = require('../images/delivery_icon.png')

interface LandingProps {
    userReducer: UserState,
    onUpdateLocation: Function
}
const _LandingScreen: React.FC<LandingProps> = (props) => {

    const { userReducer, onUpdateLocation } = props

    const { navigate } = useNavigation() //isntantiate the navigation hook

    const [errorMsg, setErrorMsg] = useState('')
    const [address, setAddress] = useState<Location>()

    const [displayAddress, setDisplayAddress] = useState(waitingForAddressString)

    useEffect(() => {
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMsg('Permission to access location is not granted.')
            }
            let location: any = await Location.getCurrentPositionAsync({})
            const { coords } = location

            if (coords) {
                const { latitude, longitude } = coords

                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude })

                for (let item of addressResponse) {
                    setAddress(item)
                    let currentAddress = `${item.street}, ${item.name}, ${item.country}`//, ${item.postalCode}`
                    setDisplayAddress(currentAddress)

                    if (currentAddress.length > 0) {
                        setTimeout(() => {
                            navigate('homeStack')
                        }, 2000)
                    }
                    return;
                }

            } else {
                //notificate user 

            }
        }
        getLocation()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.navigation} />

            <View style={styles.body}>
                <Image source={logo} style={styles.deliveryIcon} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressTitle}>{landingPageString}</Text>
                </View>
                <Text style={styles.addressText}>{displayAddress}</Text>
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

const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer
})

export const LandingScreen = connect(mapToStateProps, { onUpdateLocation })(_LandingScreen)
