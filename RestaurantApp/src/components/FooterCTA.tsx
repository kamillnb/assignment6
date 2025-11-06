import React from 'react';
import { Text, View } from 'react-native';

export default function FooterCTA() {
  return (
    <View
      style={{
        marginTop: 24,
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          backgroundColor: '#1b1b1b',
          borderColor: '#2c2c2c',
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
        }}
      >
        <Text style={{ color: '#ffffff', fontSize: 18, fontWeight: '700' }}>
          Book a Table
        </Text>
        <Text style={{ color: '#cfcfcf', marginTop: 6 }}>
          Reserve your spot by phone or our website. Walk-ins welcome.
        </Text>
        <View
          style={{
            marginTop: 12,
            backgroundColor: '#FFD9B3',
            borderRadius: 12,
            alignSelf: 'flex-start',
          }}
        >
          <Text
            style={{
              color: '#2b1200',
              paddingHorizontal: 16,
              paddingVertical: 10,
              fontWeight: '700',
            }}
          >
            Reserve (mock)
          </Text>
        </View>
      </View>
      <Text
        style={{
          color: '#6f6f6f',
          textAlign: 'center',
          marginTop: 16,
          fontSize: 12,
        }}
      >
        Layout only • No navigation or data in this exercise
      </Text>
    </View>
  );
}
