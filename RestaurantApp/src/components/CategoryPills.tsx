import React from 'react';
import { Pressable, ScrollView } from 'react-native';
import Pill from './Pill';
import type { Category } from '../types';

export default function CategoryPills({
  items, selected, onSelect,
}: { items: Category[]; selected: Category; onSelect: (c: Category) => void; }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
      {items.map(c => (
        <Pressable key={c} onPress={() => onSelect(c)}>
          <Pill label={c} selected={c === selected} />
        </Pressable>
      ))}
    </ScrollView>
  );
}
