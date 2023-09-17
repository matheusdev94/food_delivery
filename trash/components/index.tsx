import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomBar from './BottomBar';
import Display from './Display';
// import Icon from 'react-native-vector-icons/FontAwesome';

const Components: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* <Display /> */}
            <Display />
            <BottomBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: '100%',
        backgroundColor: 'blue',
        justifyContent: 'flex-end'
    },

});

export default Components;
