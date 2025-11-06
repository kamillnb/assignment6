import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StatusBar } from 'react-native';
import {
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { Category, MenuItem } from './src/types';
import type { RootStackParamList, MainTabParamList } from './src/nav/types';

import { addDish, deleteDish, getMenu, updateDish } from './src/services/api';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import TicketsScreen from './src/screens/TicketsScreen';
import FavouritesScreen from './src/screens/FavouritesScreen';
import InfoScreen from './src/screens/InfoScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs  = createBottomTabNavigator<MainTabParamList>();

const THEME = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0f0f0f',
    card: '#0f0f0f',
    border: '#222',
    text: '#fff',
    primary: '#FFD9B3',
  },
};

const CATEGORIES: Category[] = ['Starters','Mains','Grill','Pasta','Desserts','Wine'];

function MainTabs({
  menu,
  selected,
  setSelected,
  loading,
  error,
  refreshMenu,
  onCreateDish,
  creating,
  onToggleFavourite,
  onDeleteDish,
  updatingIds,
  deletingIds,
}: {
  menu: MenuItem[];
  selected: Category;
  setSelected: (c: Category) => void;
  loading: boolean;
  error: string | null;
  refreshMenu: () => void;
  onCreateDish: (category: Category) => void;
  creating: boolean;
  onToggleFavourite: (item: MenuItem) => void;
  onDeleteDish: (item: MenuItem) => void;
  updatingIds: number[];
  deletingIds: number[];
}) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f0f0f', borderTopColor: '#222' },
        tabBarActiveTintColor: '#FFD9B3',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarIcon: ({ color }) => (
          <></> // enkel placeholder – vi bruker bare labels
        ),
      })}
    >
      <Tabs.Screen name="Browse">
        {({ navigation }) => (
          <HomeScreen
            categories={CATEGORIES}
            selected={selected}
            onSelect={setSelected}
            menu={menu}
            loading={loading}
            error={error}
            onRefresh={refreshMenu}
            onCreate={onCreateDish}
            creating={creating}
            onToggleFavourite={onToggleFavourite}
            onDelete={onDeleteDish}
            onOpenDetails={(item) => navigation.navigate('Details', { item })}
            updatingIds={updatingIds}
            deletingIds={deletingIds}
          />
        )}
      </Tabs.Screen>
      <Tabs.Screen name="Favourites" component={FavouritesScreen} />
      <Tabs.Screen name="Info"       component={InfoScreen} />
    </Tabs.Navigator>
  );
}

export default function App() {
  const [selected, setSelected] = useState<Category>('Mains');
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState<boolean>(false);
  const [updatingIds, setUpdatingIds] = useState<number[]>([]);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);

  const refreshMenu = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await getMenu();
      setMenu(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load menu';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshMenu();
  }, [refreshMenu]);

  const handleCreateDish = useCallback(async (category: Category) => {
    if (creating) return;
    setCreating(true);
    try {
      const payload: Partial<MenuItem> = {
        title: `Chef's ${category} ${new Date().toLocaleTimeString()}`,
        description: 'Seasonal dish added from the mobile app.',
        price: Math.floor(150 + Math.random() * 200),
        image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200',
        category,
        favourite: false,
      };
      const created = await addDish(payload);
      setMenu(prev => [...prev, created]);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to add dish';
      Alert.alert('Failed to add dish', message);
    } finally {
      setCreating(false);
    }
  }, [creating]);

  const handleToggleFavourite = useCallback(async (item: MenuItem) => {
    if (updatingIds.includes(item.id)) return;
    setUpdatingIds(prev => (prev.includes(item.id) ? prev : [...prev, item.id]));
    const nextFav = !item.favourite;

    let snapshot: MenuItem[] = [];
    setMenu(prev => {
      snapshot = prev;
      return prev.map(m => (m.id === item.id ? { ...m, favourite: nextFav } : m));
    });

    try {
      const updated = await updateDish(item.id, { favourite: nextFav });
      setMenu(prev => prev.map(m => (m.id === updated.id ? updated : m)));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to update favourite';
      setMenu(snapshot);
      Alert.alert('Failed to update favourite', message);
    } finally {
      setUpdatingIds(prev => prev.filter(id => id !== item.id));
    }
  }, [updatingIds]);

  const handleDeleteDish = useCallback(async (item: MenuItem) => {
    if (deletingIds.includes(item.id)) return;
    setDeletingIds(prev => (prev.includes(item.id) ? prev : [...prev, item.id]));

    let snapshot: MenuItem[] = [];
    setMenu(prev => {
      snapshot = prev;
      return prev.filter(m => m.id !== item.id);
    });

    try {
      await deleteDish(item.id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to delete dish';
      setMenu(snapshot);
      Alert.alert('Failed to delete dish', message);
    } finally {
      setDeletingIds(prev => prev.filter(id => id !== item.id));
    }
  }, [deletingIds]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={THEME}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs">
            {() => (
              <MainTabs
                menu={menu}
                selected={selected}
                setSelected={setSelected}
                loading={loading}
                error={error}
                refreshMenu={refreshMenu}
                onCreateDish={handleCreateDish}
                creating={creating}
                onToggleFavourite={handleToggleFavourite}
                onDeleteDish={handleDeleteDish}
                updatingIds={updatingIds}
                deletingIds={deletingIds}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Tickets" component={TicketsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
