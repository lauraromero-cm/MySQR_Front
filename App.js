import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, ScrollView } from 'react-native';
import QR from './Qr_IOS'
const icon = require('./assets/favicon.png');



export default function App() {
  return (
    <ScrollView style={styles.container}>
      
      <StatusBar style="dark" />
      <QR />
      
      

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
