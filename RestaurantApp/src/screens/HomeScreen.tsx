import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Props = {
  badge: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  overlay?: number; // 0..1
  onPressCta?: () => void;    // <- NY
  ctaLabel?: string;          // <- NY
};

export default function HeroHeader({
  badge,
  title,
  subtitle,
  imageUrl,
  overlay = 0.3,
  onPressCta,
  ctaLabel = 'Learn more',
}: Props) {
  return (
    <View style={styles.wrap}>
      <ImageBackground
        source={{ uri: imageUrl }}
        style={styles.bg}
        imageStyle={{ resizeMode: 'cover' }}
      >
        <View style={[styles.overlay, { opacity: overlay }]} />
        <View style={styles.content}>
          <Text style={styles.badge}>{badge}</Text>
          <Text style={styles.title}>{title}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

          {onPressCta && (
            <TouchableOpacity style={styles.cta} onPress={onPressCta} activeOpacity={0.8}>
              <Text style={styles.ctaText}>{ctaLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, overflow: 'hidden' },
  bg: { height: 320, justifyContent: 'flex-end' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  content: { paddingHorizontal: 20, paddingBottom: 24 },
  badge: { color: '#e5e5e5', letterSpacing: 2, fontSize: 12, marginBottom: 6 },
  title: { color: '#fff', fontSize: 36, fontWeight: '800' },
  subtitle: { color: '#e5e5e5', marginTop: 8, fontSize: 16 },
  cta: {
    alignSelf: 'flex-start',
    marginTop: 14,
    backgroundColor: '#f5c58e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  ctaText: { color: '#1a1a1a', fontWeight: '700' },
});
