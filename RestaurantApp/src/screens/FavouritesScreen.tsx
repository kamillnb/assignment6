import React from 'react';
import { View, Text } from 'react-native';

export default function FavouritesScreen() {
  return (
    <View style={{ flex:1, backgroundColor:'#0f0f0f', padding:20 }}>
      <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Favourites</Text>
      <Text style={{ color:'#cfcfcf', marginTop:8 }}>No favourites yet.</Text>
    </View>
  );
}
