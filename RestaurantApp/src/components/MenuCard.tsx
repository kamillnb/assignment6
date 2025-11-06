import React from 'react';
import { ActivityIndicator, Image, Text, View, TouchableOpacity } from 'react-native';
import type { MenuItem } from '../types';

type Props = {
  item: MenuItem;
  onPress?: () => void;
  onToggleFavourite?: () => void;
  onDelete?: () => void;
  isUpdating?: boolean;
  isDeleting?: boolean;
};

export default function MenuCard({
  item,
  onPress,
  onToggleFavourite,
  onDelete,
  isUpdating = false,
  isDeleting = false,
}: Props) {
  const disableFavourite = isUpdating || isDeleting;
  const disableDelete = isDeleting || isUpdating;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        backgroundColor: '#151515',
        borderColor: '#2a2a2a',
        borderWidth: 1,
        borderRadius: 16,
        overflow: 'hidden',
        width: 320,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: '100%', height: 190 }}
      />
      <View style={{ padding: 14 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
          {item.title}
        </Text>
        <Text style={{ color: '#b8b8b8', marginTop: 4 }}>{item.description}</Text>
        <Text style={{ color: '#f3c892', marginTop: 10, fontWeight: '600' }}>
          NOK {item.price}
        </Text>

        <View style={{ gap: 12, marginTop: 12 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              onPress={onToggleFavourite}
              disabled={disableFavourite}
              style={{
                backgroundColor: '#1f1f1f',
                borderRadius: 999,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: item.favourite ? '#f2b98b' : '#2e2e2e',
                opacity: disableFavourite ? 0.5 : 1,
              }}
            >
              <Text style={{ color: item.favourite ? '#f2b98b' : '#eaeaea' }}>
                {item.favourite ? '❤️ Fav' : '🤍 Fav'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onDelete}
              disabled={disableDelete}
              style={{
                backgroundColor: '#1f1f1f',
                borderRadius: 999,
                paddingVertical: 8,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: '#2e2e2e',
                opacity: disableDelete ? 0.5 : 1,
              }}
            >
              <Text style={{ color: '#eaeaea' }}>🗑️ Delete</Text>
            </TouchableOpacity>
          </View>

          {(isUpdating || isDeleting) ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <ActivityIndicator size="small" color="#f2b98b" />
              <Text style={{ color: '#f2b98b', fontSize: 12 }}>
                {isDeleting ? 'Deleting…' : 'Saving…'}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
