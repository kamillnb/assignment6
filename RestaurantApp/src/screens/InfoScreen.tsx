import React from 'react';
import { View, Text } from 'react-native';

export default function InfoScreen() {
  return (
    <View style={{ flex:1, backgroundColor:'#0f0f0f', padding:20 }}>
      <Text style={{ color:'#fff', fontSize:20, fontWeight:'700' }}>Info</Text>
      <Text style={{ color:'#cfcfcf', marginTop:8 }}>
        Opening hours, address and contact would go here.
      </Text>
    </View>
  );
}
