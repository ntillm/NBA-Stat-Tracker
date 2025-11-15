import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [status, setStatus] = useState('Loading...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.0.47:3001/api/health')
      .then(response => response.json())
      .then(data => {
        setStatus(data.message);
        setLoading(false);
      })
      .catch(error => {
        setStatus('Error connecting to backend');
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Stats Tracker</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={styles.status}>{status}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: 'green',
  },
});
