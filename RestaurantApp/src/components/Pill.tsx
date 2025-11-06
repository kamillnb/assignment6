import React from 'react';
import { Text, View } from 'react-native';

export default function Pill({
  label, selected = false,
}: { label: string; selected?: boolean }) {
  return (
    <View style={{
      paddingHorizontal: 14, paddingVertical: 10, borderRadius: 999,
      backgroundColor: selected ? '#2c2c2c' : '#1b1b1b', borderWidth: 1,
      borderColor: selected ? '#3a3a3a' : '#2c2c2c',
    }}>
      <Text style={{ color: '#f3f3f3', fontSize: 13 }}>{label}</Text>
    </View>
  );
}
