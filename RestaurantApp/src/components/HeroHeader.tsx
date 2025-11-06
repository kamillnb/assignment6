import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  overlay?: number; // 0..1
};

export default function HeroHeader({ badge, title, subtitle, imageUrl, overlay = 0.35 }: Props) {
  return (
    <ImageBackground source={{ uri: imageUrl }} style={{ height: 320, justifyContent: 'flex-end' }}>
      <View style={{ paddingHorizontal: 20, paddingVertical: 24, backgroundColor: `rgba(0,0,0,${overlay})` }}>
        {badge ? <Text style={{ color: '#FFD9B3', fontSize: 14, letterSpacing: 2 }}>{badge}</Text> : null}
        <Text style={{ color: 'white', fontSize: 36, fontWeight: '800', marginTop: 4 }}>{title}</Text>
        {subtitle ? <Text style={{ color: '#EDEDED', marginTop: 6, fontSize: 15 }}>{subtitle}</Text> : null}
      </View>
    </ImageBackground>
  );
}
