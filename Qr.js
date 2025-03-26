import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Linking } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [scanned, setScanned] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setScannerActive(false);
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const startScanning = () => {
    setScanned(false);
    setScannerActive(true);
    setScannedData('');
  };

  if (!permission) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>QR Code Scanner</Text>
      </View>

      {scannerActive ? (
        <View style={styles.scannerContainer}>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.overlay}>
            <View style={styles.scanFrame} />
          </View>
          
          {scanned && (
            <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
          )}
        </View>
      ) : (
        <View style={styles.resultContainer}>
          {scannedData ? (
            <>
              <Text style={styles.resultTitle}>Scanned Result:</Text>
              <View style={styles.resultBox}>
                <Text style={styles.resultText}>{scannedData}</Text>
              </View>
              {scannedData.startsWith('http') && (
                <Button 
                  title="Open URL" 
                  onPress={() => Linking.openURL(scannedData)} 
                />
              )}
            </>
          ) : (
            <Text style={styles.instructions}>
              Press the button below to start scanning a QR code
            </Text>
          )}
          <Button 
            title={scannedData ? "Scan Another Code" : "Start Scanning"} 
            onPress={startScanning} 
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scannerContainer: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'transparent',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultBox: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    margin: 20,
  }
});