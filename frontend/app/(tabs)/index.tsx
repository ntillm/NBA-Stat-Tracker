import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TextInput, FlatList } from 'react-native';

export default function Index() {
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  /* useEffect(() => {
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
  }, []); */
  
  useEffect(() => {
    const debounceDelay = setTimeout(() => {
      searchPlayers(searchTerm)
    }, 500);

    return () => clearTimeout(debounceDelay);
  }, [searchTerm])

  const searchPlayers = async(name) => {
    const playerName = String(name);
    if (!playerName.trim()) {
      setSearchResults([]);
  return;
    }
    setSearchLoading(true);

    try {
      const encodeName = encodeURI(playerName.trim())
      const response = await fetch(`http://192.168.0.47:3001/api/players/search?search${encodeName}`);
      
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      
      const data = await response.json()
      setSearchResults(data.response || []);

    } catch (error){
      console.error("Search failed", error);
      setSearchResults([])

    } finally {
    setSearchLoading(false)
    } 
  };

  const renderPlayer = ({item}) => (
    <View style={styles.playerCard}>
      <Text style={styles.playerName}>
        {item.firstname} {item.lastname}
      </Text>
      <Text style={styles.playerDetails}>
        ID: {item.id}
      </Text>
    </View>
  )
  
  return (
    <SafeAreaView style={styles.container}>
     <Text style={styles.title}>Player Stats Tracker</Text>

      <TextInput
        style={styles.input}
        onChangeText={setSearchTerm}
        value={searchTerm}
        placeholder='Search by last name'
      />

      <FlatList
        data = {searchResults}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
      />
    
    </SafeAreaView>
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
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
  list: {
        // FlatList needs a style to take up available space
        width: '90%', 
        marginTop: 10,
    },
    
    // --- Styles for Individual Player Item ---
    playerCard: {
        flexDirection: 'row', // Align name and ID horizontally
        justifyContent: 'space-between', // Push name to left, details to right
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 15,
        marginVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: '#eee', // Subtle separator line
        backgroundColor: '#f9f9f9', // Light background for the item
        borderRadius: 8, // Slightly rounded corners
        shadowColor: '#000', // Basic shadow for depth
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1, // Elevation for Android shadow
    },

    playerName: {
        fontSize: 16,
        fontWeight: '600', // Semi-bold for player name
        color: '#333',
    },

    playerDetails: {
        fontSize: 14,
        color: '#666', // Muted color for secondary detail (like ID or team)
    },
});
