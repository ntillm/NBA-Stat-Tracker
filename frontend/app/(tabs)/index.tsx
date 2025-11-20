import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

export default function Index() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://192.168.0.47:3001/api/players/165')
      .then(response => response.json())
      .then(data => {
        setPlayer(data.response[0]);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Player Stats Tracker</Text>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : player ?(
        <Text> {player.firstname} {player.lastname}</Text>
      ) : (
        <Text> No Player Found </Text>
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
