import React from 'react';
import { View } from 'react-native';
import MenuCard from './MenuCard';
import type { MenuItem } from '../types';

type Props = {
  items: MenuItem[];
  onToggleFavourite?: (item: MenuItem) => void;
  onDelete?: (item: MenuItem) => void;
  onOpenDetails?: (item: MenuItem) => void;
};

export default function FeaturedGrid({ items, onToggleFavourite, onDelete, onOpenDetails }: Props) {
  return (
    <View style={{ gap: 16 }}>
      {items.map(item => (
        <MenuCard
          key={item.id}
          item={item}
          onPress={() => onOpenDetails?.(item)}
          onToggleFavourite={() => onToggleFavourite?.(item)}
          onDelete={() => onDelete?.(item)}
        />
      ))}
    </View>
  );
}
