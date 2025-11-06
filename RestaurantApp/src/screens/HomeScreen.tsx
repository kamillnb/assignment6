import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import CategoryPills from '../components/CategoryPills';
import FeaturedGrid from '../components/FeaturedGrid';
import FooterCTA from '../components/FooterCTA';
import HeroHeader from '../components/HeroHeader';
import SectionTitle from '../components/SectionTitle';
import type { Category, MenuItem } from '../types';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1604908177884-225640892f0f?q=80&w=1200';

type Props = {
  categories: Category[];
  selected: Category;
  onSelect: (c: Category) => void;
  menu: MenuItem[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onCreate: (category: Category) => void;
  creating: boolean;
  onToggleFavourite: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
  onOpenDetails: (item: MenuItem) => void;
  updatingIds: number[];
  deletingIds: number[];
};

export default function HomeScreen({
  categories,
  selected,
  onSelect,
  menu,
  loading,
  error,
  onRefresh,
  onCreate,
  creating,
  onToggleFavourite,
  onDelete,
  onOpenDetails,
  updatingIds,
  deletingIds,
}: Props) {
  const filteredMenu = useMemo(
    () => menu.filter((item) => item.category?.toLowerCase() === selected.toLowerCase()),
    [menu, selected]
  );

  const heroItem = filteredMenu[0] ?? menu[0];
  const showInitialLoading = loading && menu.length === 0;
  const showEmptyState = !loading && filteredMenu.length === 0;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0f0f0f' }}
      contentContainerStyle={{ paddingBottom: 32 }}
      refreshControl={
        <RefreshControl
          refreshing={loading && menu.length > 0}
          onRefresh={onRefresh}
          tintColor="#FFD9B3"
        />
      }
    >
      <HeroHeader
        badge="Tonight's highlight"
        title={heroItem ? heroItem.title : 'Our Seasonal Menu'}
        subtitle={
          heroItem
            ? heroItem.description
            : 'Swipe down to load the latest dishes from the kitchen.'
        }
        imageUrl={heroItem?.image ?? FALLBACK_IMAGE}
        overlay={0.45}
      />

      <View style={{ paddingHorizontal: 20, paddingTop: 24 }}>
        <SectionTitle
          title="Browse the menu"
          subtitle="Tap a dish to see details or update it live."
        />

        <View style={{ marginTop: 16 }}>
          <CategoryPills items={categories} selected={selected} onSelect={onSelect} />
        </View>

        <TouchableOpacity
          onPress={() => onCreate(selected)}
          disabled={creating}
          activeOpacity={0.8}
          style={{
            marginTop: 20,
            backgroundColor: '#FFD9B3',
            borderRadius: 12,
            alignSelf: 'flex-start',
            opacity: creating ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: '#2b1200',
              fontWeight: '700',
              paddingHorizontal: 16,
              paddingVertical: 10,
            }}
          >
            {creating ? 'Adding dish…' : `Add ${selected.toLowerCase()} dish`}
          </Text>
        </TouchableOpacity>

        {error ? (
          <TouchableOpacity
            onPress={onRefresh}
            activeOpacity={0.8}
            style={{
              marginTop: 16,
              backgroundColor: '#1b1b1b',
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#2c2c2c',
              padding: 16,
            }}
          >
            <Text style={{ color: '#f5c58e', fontWeight: '600' }}>
              Unable to reach the menu service
            </Text>
            <Text style={{ color: '#cfcfcf', marginTop: 6 }}>{error}</Text>
            <Text style={{ color: '#9f9f9f', marginTop: 6, fontSize: 12 }}>
              Tap to try again.
            </Text>
          </TouchableOpacity>
        ) : null}

        {showInitialLoading ? (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color="#FFD9B3" />
            <Text style={{ color: '#cfcfcf', marginTop: 12 }}>
              Loading the latest dishes…
            </Text>
          </View>
        ) : null}

        {!showInitialLoading && !showEmptyState ? (
          <View style={{ marginTop: 24 }}>
            <FeaturedGrid
              items={filteredMenu}
              onToggleFavourite={onToggleFavourite}
              onDelete={onDelete}
              onOpenDetails={onOpenDetails}
              updatingIds={updatingIds}
              deletingIds={deletingIds}
            />
          </View>
        ) : null}

        {showEmptyState ? (
          <View
            style={{
              marginTop: 36,
              backgroundColor: '#141414',
              borderRadius: 16,
              borderWidth: 1,
              borderColor: '#252525',
              padding: 20,
            }}
          >
            <Text style={{ color: '#ffffff', fontWeight: '700', fontSize: 16 }}>
              Nothing here yet
            </Text>
            <Text style={{ color: '#cfcfcf', marginTop: 8 }}>
              Add a dish to this category to make it appear in the live menu.
            </Text>
          </View>
        ) : null}
      </View>

      <FooterCTA />
    </ScrollView>
  );
}
