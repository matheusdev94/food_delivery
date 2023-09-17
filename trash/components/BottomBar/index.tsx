import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';


const BottomBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon name="home" size={24} color="black" />
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="star" size={24} color="black" />
          <Text style={styles.buttonText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="shopping-cart" size={24} color="black" />
          <Text style={styles.buttonText}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="user" size={24} color="black" />
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: '#ddd',
    // position: 'absolute',
    width: "100%",
    justifyContent: 'flex-end'
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    marginTop: 4,
    fontSize: 12,
    color: 'black'
  },
});

export default BottomBar;
