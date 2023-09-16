import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Display: React.FC = () => {
    return (
        <View style={styles.container}>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 3,
        backgroundColor: 'purple',
        borderTopWidth: 1,
        borderColor: '#ddd',
        // position: 'absolute',
        width: "100%",
        justifyContent: 'flex-end'
    }

});

export default Display;
