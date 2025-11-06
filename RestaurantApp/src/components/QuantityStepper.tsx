import React from 'react';
import { Text, View, Pressable } from 'react-native';

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 9,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  const dec = () => onChange(Math.max(min, value - 1));
  const inc = () => onChange(Math.min(max, value + 1));

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        gap: 12,
        backgroundColor: '#1b1b1b',
        borderWidth: 1,
        borderColor: '#2c2c2c',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        alignItems: 'center',
      }}
    >
      <Pressable onPress={dec}><Text style={{ color: '#fff', fontSize: 18 }}>−</Text></Pressable>
      <Text style={{ color: '#FFD9B3', width: 22, textAlign: 'center' }}>{value}</Text>
      <Pressable onPress={inc}><Text style={{ color: '#fff', fontSize: 18 }}>＋</Text></Pressable>
    </View>
  );
}
