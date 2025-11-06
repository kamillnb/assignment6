import React from 'react';
import { Text, View, Pressable, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../nav/types';

type Nav = NativeStackNavigationProp<RootStackParamList,'Tickets'>;
type Rt  = RouteProp<RootStackParamList,'Tickets'>;

export default function TicketsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { itemId, qty } = route.params;

  return (
    <ScrollView style={{ backgroundColor:'#0f0f0f' }} contentContainerStyle={{ padding: 20 }}>
      <Text style={{ color:'#fff', fontSize:22, fontWeight:'700' }}>Tickets (Mock)</Text>
      <Text style={{ color:'#cfcfcf', marginTop:8 }}>Item ID: {itemId}</Text>
      <Text style={{ color:'#cfcfcf' }}>Quantity: {qty}</Text>

      <Pressable
        onPress={() => navigation.navigate('MainTabs')}
        style={{ marginTop: 16, backgroundColor:'#FFD9B3', borderRadius:12, alignSelf:'flex-start' }}
      >
        <Text style={{ color:'#2b1200', paddingHorizontal:16, paddingVertical:10, fontWeight:'700' }}>
          Back to Home
        </Text>
      </Pressable>
    </ScrollView>
  );
}
