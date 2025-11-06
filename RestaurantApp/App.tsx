import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import {
  DarkTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { Category, MenuItem } from './src/types';
import type { RootStackParamList, MainTabParamList } from './src/nav/types';

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
  menu, selected, setSelected,
}: {
  menu: MenuItem[];
  selected: Category;
  setSelected: (c: Category) => void;
}) {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0f0f0f', borderTopColor: '#222' },
        tabBarActiveTintColor: '#FFD9B3',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarIcon: ({ color }) => (
          // enkle emoji-ikoner (ingen lib nødvendig)
          // 🍽️ ⭐ ℹ️
          // (kun tekst-ikon for å holde koden minimal)
          // eslint-disable-next-line react-native/no-inline-styles
          <>{/* icon placeholder */}</>
        ),
      })}
    >
      <Tabs.Screen name="Browse">
        {() => (
          <HomeScreen
            categories={CATEGORIES}
            selected={selected}
            onSelect={setSelected}
            items={menu.filter(m => m.category === selected)}
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
  const [menu] = useState<MenuItem[]>([
    { id:'1', title:'Fire-Grilled Ribeye', description:'Herb butter, charred lemon', price:'NOK 395', image:'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=1200', category:'Grill' },
    { id:'2', title:'Lobster Pasta', description:'Tomato & basil, fresh tagliatelle', price:'NOK 345', image:'https://images.unsplash.com/photo-1521389508051-d7ffb5dc8bbf?q=80&w=1200', category:'Pasta' },
    { id:'3', title:'Seasonal Greens', description:'Smoky almonds, citrus vinaigrette', price:'NOK 145', image:'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200', category:'Starters' },
    { id:'4', title:'Charred Salmon', description:'Fennel, dill & lemon', price:'NOK 295', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200', category:'Mains' },
  ]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer theme={THEME}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs">
            {() => (
              <MainTabs menu={menu} selected={selected} setSelected={setSelected} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Details" component={DetailsScreen} />
          <Stack.Screen name="Tickets" component={TicketsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
