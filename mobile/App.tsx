import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { LandingScreen } from './src/screen/LandingScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <LandingScreen />
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: '100%'
  },
});
