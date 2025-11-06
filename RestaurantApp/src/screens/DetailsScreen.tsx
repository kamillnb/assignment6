import React, { useState } from 'react';
import { Image, ScrollView, Text, View, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import QuantityStepper from '../components/QuantityStepper';
import type { RootStackParamList } from '../nav/types';

type Nav = NativeStackNavigationProp<RootStackParamList,'Details'>;
type Rt  = RouteProp<RootStackParamList,'Details'>;

export default function DetailsScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rt>();
  const { item } = route.params;
  const [qty, setQty] = useState(1);
  const [fav, setFav] = useState(false);

  return (
    <ScrollView
      style={{ backgroundColor: '#0f0f0f' }}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Image source={{ uri: item.image }} style={{ width: '100%', height: 280 }} />
      <View style={{ padding: 20, gap: 12 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ color: '#FFD9B3' }}>← Back</Text>
        </Pressable>

        <Text style={{ color:'#fff', fontSize:26, fontWeight:'800' }}>{item.title}</Text>
        <Text style={{ color:'#cfcfcf' }}>{item.description}</Text>
        <Text style={{ color:'#FFD9B3', fontSize:16 }}>{item.price}</Text>

        <QuantityStepper value={qty} onChange={setQty} />

        <Pressable
          onPress={() => setFav(v => !v)}
          style={{
            marginTop: 8, backgroundColor: fav ? '#FFD9B3' : '#1b1b1b',
            borderColor:'#2c2c2c', borderWidth:1, borderRadius:12, alignSelf:'flex-start',
          }}
        >
          <Text style={{
            color: fav ? '#2b1200' : '#f3f3f3',
            paddingHorizontal:16, paddingVertical:10, fontWeight:'700'
          }}>
            {fav ? '★ In favourites' : '☆ Add to favourites'}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Tickets', { itemId: item.id, qty })}
          style={{ marginTop: 12, backgroundColor:'#FFD9B3', borderRadius:12, alignSelf:'flex-start' }}
        >
          <Text style={{ color:'#2b1200', paddingHorizontal:16, paddingVertical:10, fontWeight:'700' }}>
            Go to Tickets (mock)
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
