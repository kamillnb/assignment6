import React from 'react';
import { Text, View } from 'react-native';

export default function InfoBlock({
  hours,
  address,
  phone,
}: {
  hours: { day: string; time: string }[];
  address: string;
  phone: string;
}) {
  return (
    <View
      style={{
        backgroundColor: '#141414',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#262626',
        padding: 16,
        gap: 12,
        marginTop: 8,
      }}
    >
      <View style={{ flexDirection: 'row', gap: 18 }}>
        <View style={{ gap: 6, flex: 1 }}>
          {hours.map((h) => (
            <View
              key={h.day}
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={{ color: '#eaeaea' }}>{h.day}</Text>
              <Text style={{ color: '#cfcfcf' }}>{h.time}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: '#262626' }} />
      <Text style={{ color: '#eaeaea' }}>{address}</Text>
      <Text style={{ color: '#cfcfcf' }}>{phone}</Text>
    </View>
  );
}
