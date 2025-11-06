import React from 'react';
import { Text, View } from 'react-native';

export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={{ gap: 4, marginTop: 16 }}>
      <Text style={{ color: '#ffffff', fontSize: 22, fontWeight: '700' }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: '#cfcfcf', fontSize: 14 }}>{subtitle}</Text>
      ) : null}
    </View>
  );
}
